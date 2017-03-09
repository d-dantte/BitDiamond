﻿using Axis.Luna;
using Axis.Luna.Extensions;
using Castle.DynamicProxy;
using SimpleInjector;
using System;
using System.Collections.Generic;
using System.Linq;
using static Axis.Luna.Extensions.ExceptionExtensions;

namespace BitDiamond.Web.Infrastructure.DI
{
    public interface ILazyServiceFaker { }


    public class LazyFakerImpl : ILazyServiceFaker { }


    public class ServiceInterceptor<Impl> : IInterceptor
    where Impl : class
    {
        private Impl serviceImpl = null;
        private IServiceResolver _resolver;

        public ServiceInterceptor(IServiceResolver resolver)
        {
            ThrowNullArguments(() => resolver);

            _resolver = resolver;
        }

        public void Intercept(IInvocation invocation)
        {
            if (serviceImpl == null) serviceImpl = _resolver.Resolve<Impl>();

            var changable = invocation.As<IChangeProxyTarget>();
            changable.ChangeInvocationTarget(serviceImpl);
            invocation.Proceed();
        }
    }


    public class SimpleContainerResolver : IServiceResolver
    {
        private Container _container;

        public SimpleContainerResolver(Container c)
        {
            this._container = c;
        }

        public void Dispose() => _container.Dispose();

        public object Resolve(Type serviceType, params object[] args) => _container.GetInstance(serviceType);

        public Service Resolve<Service>(params object[] args) => _container.GetInstance(typeof(Service)).As<Service>();

        public IEnumerable<object> ResolveAll(Type serviceType, params object[] args) => _container.GetAllInstances(serviceType);

        public IEnumerable<Service> ResolveAll<Service>(params object[] args) => _container.GetAllInstances(typeof(Service)).Cast<Service>();
    }


    public static class ServiceInvocationHelper
    {
        private static LazyFakerImpl SingletonFaker = new LazyFakerImpl();

        public static Service CreateLazyService<Service, Impl>(this ProxyGenerator proxyGen, IServiceResolver resolver)
        where Service : class 
        where Impl: class, Service
        {
            var proxy = proxyGen.CreateInterfaceProxyWithTargetInterface(typeof(ILazyServiceFaker), new[] { typeof(Service) }, SingletonFaker, new ServiceInterceptor<Impl>(resolver));
            return proxy as Service;
        }
        
        public static Container RegisterLazyService<Service, Impl>(this Container container, ProxyGenerator proxyGenerator, Lifestyle scope)
        where Service : class
        where Impl : class, Service
        {
            container.Register<Impl, Impl>(scope);
            container.Register(() => proxyGenerator.CreateLazyService<Service, Impl>(new SimpleContainerResolver(container)), scope);
            return container;
        }
    }
}