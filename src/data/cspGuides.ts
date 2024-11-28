export interface CSPGuide {
  frameworkId: string;
  implementation: string;
  example: string;
  bestPractices: string[];
}

export const cspGuides: CSPGuide[] = [
  // Python Frameworks
  {
    frameworkId: 'django',
    implementation: `# Install django-csp
pip install django-csp

# settings.py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'csp.middleware.CSPMiddleware',
    # ... other middleware
]

# CSP Configuration
CSP_DEFAULT_SRC = ("'self'",)
CSP_STYLE_SRC = ("'self'", "'unsafe-inline'")
CSP_SCRIPT_SRC = ("'self'",)
CSP_IMG_SRC = ("'self'", "https:",)
CSP_FONT_SRC = ("'self'", "https:",)
CSP_CONNECT_SRC = ("'self'",)`,
    example: `# views.py
from django.http import HttpResponse

def index(request):
    response = HttpResponse("Hello, world!")
    response['Content-Security-Policy'] = "default-src 'self'"
    return response`,
    bestPractices: [
      "Always use 'self' as default-src",
      "Avoid using 'unsafe-inline' and 'unsafe-eval'",
      'Specify trusted domains explicitly',
      'Use nonce-based CSP for inline scripts when needed',
      'Regular audit and update of CSP rules',
    ],
  },
  {
    frameworkId: 'flask',
    implementation: `from flask import Flask, make_response

app = Flask(__name__)

@app.after_request
def add_security_headers(response):
    response.headers['Content-Security-Policy'] = (
        "default-src 'self'; "
        "script-src 'self'; "
        "style-src 'self' 'unsafe-inline'; "
        "img-src 'self' https:; "
        "font-src 'self' https:; "
        "connect-src 'self'"
    )
    return response`,
    example: `from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    response = make_response('Hello, World!')
    response.headers['Content-Security-Policy'] = "default-src 'self'"
    return response`,
    bestPractices: [
      'Implement CSP headers using after_request decorator',
      'Use secure defaults for all directives',
      'Test CSP implementation in report-only mode',
      'Monitor CSP violations',
      'Keep CSP policy as restrictive as possible',
    ],
  },
  {
    frameworkId: 'fastapi',
    implementation: `from fastapi import FastAPI, Response
from fastapi.middleware.trustedhost import TrustedHostMiddleware

app = FastAPI()

@app.middleware("http")
async def add_csp_header(request, call_next):
    response = await call_next(request)
    response.headers['Content-Security-Policy'] = (
        "default-src 'self'; "
        "script-src 'self'; "
        "style-src 'self' 'unsafe-inline'; "
        "img-src 'self' https:; "
        "font-src 'self' https:; "
        "connect-src 'self'"
    )
    return response`,
    example: `from fastapi import FastAPI, Response

app = FastAPI()

@app.get("/")
async def root():
    response = Response("Hello, World!")
    response.headers['Content-Security-Policy'] = "default-src 'self'"
    return response`,
    bestPractices: [
      'Use middleware for consistent CSP implementation',
      'Implement CSP reporting endpoints',
      'Start with strict policies and relax as needed',
      'Regular security audits',
      'Keep dependencies updated',
    ],
  },
  {
    frameworkId: 'pyramid',
    implementation: `from pyramid.config import Configurator
from pyramid.response import Response
from pyramid.tweens import EXCVIEW

def includeme(config):
    # Add the CSP tween
    config.add_tween('myapp.csp_tween')

def csp_tween(handler, registry):
    def tween(request):
        response = handler(request)

        # Define the CSP header
        csp_header = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-eval' 'unsafe-inline'; "
            "style-src 'self' 'unsafe-inline'; "
            "img-src 'self' https:; "
            "font-src 'self' https:; "
            "connect-src 'self'"
        )
        response.headers['Content-Security-Policy'] = csp_header
        return response

    return tween`,

    example: `from pyramid.config import Configurator
from pyramid.response import Response
from pyramid.renderers import render_to_response
from wsgiref.simple_server import make_server

def hello_world(request):
    return Response('Hello, Pyramid!')

if __name__ == '__main__':
    with Configurator() as config:
        config.add_route('hello', '/')
        config.add_view(hello_world, route_name='hello')

        # Add CSP settings using includeme
        includeme(config)

        app = config.make_wsgi_app()

    server = make_server('0.0.0.0', 6543, app)
    server.serve_forever()`,

    bestPractices: [
      'Implement CSP headers using a custom tween for centralized handling',
      "Avoid using 'unsafe-inline' in your CSP; use hashes or nonces for inline scripts/styles",
      "Use 'Content-Security-Policy-Report-Only' during development to monitor violations without enforcing the policy",
      "Avoid wildcards (e.g., '*' in 'default-src') to limit resource access",
      'Test the policy with tools like Google CSP Evaluator to ensure it’s configured securely',
      'Review and update the CSP regularly as your application evolves',
    ],
  },

  // Node.js Frameworks
  {
    frameworkId: 'express',
    implementation: `const helmet = require('helmet');

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "https:"],
      fontSrc: ["'self'", "https:"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);`,
    example: `const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});`,
    bestPractices: [
      'Use helmet middleware for comprehensive security headers',
      'Configure CSP based on your application needs',
      'Regularly update helmet to get latest security patches',
      'Test CSP in report-only mode before enforcement',
      'Monitor CSP violation reports',
    ],
  },
  {
    frameworkId: 'nextjs',
    implementation: `// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; " +
           "script-src 'self' 'unsafe-eval' 'unsafe-inline'; " +
           "style-src 'self' 'unsafe-inline'; " +
           "img-src 'self' https:; " +
           "font-src 'self' https:; " +
           "connect-src 'self'"
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};`,
    example: `// pages/_app.js
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // CSP violations reporting
    if (typeof window !== 'undefined') {
      document.addEventListener('securitypolicyviolation', (e) => {
        console.log('CSP violation:', e);
      });
    }
  }, []);

  return <Component {...pageProps} />;
}`,
    bestPractices: [
      'Configure CSP in next.config.js',
      'Use strict CSP in production',
      'Implement CSP violation reporting',
      'Regularly review and update policies',
      'Test thoroughly before deployment',
    ],
  },
  // Java Frameworks
  {
    frameworkId: 'spring-boot',
    implementation: `@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .headers()
                .contentSecurityPolicy(csp -> csp
                    .policyDirectives("default-src 'self'; " +
                                    "script-src 'self'; " +
                                    "style-src 'self' 'unsafe-inline'; " +
                                    "img-src 'self' https:; " +
                                    "font-src 'self' https:; " +
                                    "connect-src 'self'"));
        return http.build();
    }
}`,
    example: `@RestController
public class HomeController {
    @GetMapping("/")
    public ResponseEntity<String> home() {
        return ResponseEntity
            .ok()
            .header("Content-Security-Policy", "default-src 'self'")
            .body("Hello, World!");
    }
}`,
    bestPractices: [
      "Use Spring Security's built-in CSP support",
      'Configure CSP at the application level',
      'Implement CSP reporting endpoints',
      'Regular security audits',
      'Keep Spring Security updated',
    ],
  },
  // PHP Frameworks
  {
    frameworkId: 'laravel',
    implementation: `<?php
// app/Http/Middleware/ContentSecurityPolicy.php
namespace App\Http\Middleware;

use Closure;

class ContentSecurityPolicy
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        
        $response->headers->set(
            'Content-Security-Policy',
            "default-src 'self'; " .
            "script-src 'self'; " .
            "style-src 'self' 'unsafe-inline'; " .
            "img-src 'self' https:; " .
            "font-src 'self' https:; " .
            "connect-src 'self'"
        );
        
        return $response;
    }
}`,
    example: `<?php
// Register middleware in Kernel.php
protected $middleware = [
    \App\Http\Middleware\ContentSecurityPolicy::class,
];

// Using in routes
Route::get('/', function () {
    return response('Hello World')
        ->header('Content-Security-Policy', "default-src 'self'");
});`,
    bestPractices: [
      'Implement CSP through middleware',
      'Use environment-specific policies',
      'Regular security audits',
      'Monitor CSP violations',
      'Keep framework and packages updated',
    ],
  },
  // Go Frameworks
  {
    frameworkId: 'gin',
    implementation: `package main

import "github.com/gin-gonic/gin"

func securityHeaders() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Header("Content-Security-Policy",
            "default-src 'self'; " +
            "script-src 'self'; " +
            "style-src 'self' 'unsafe-inline'; " +
            "img-src 'self' https:; " +
            "font-src 'self' https:; " +
            "connect-src 'self'")
        c.Next()
    }
}`,
    example: `func main() {
    r := gin.Default()
    r.Use(securityHeaders())
    
    r.GET("/", func(c *gin.Context) {
        c.String(200, "Hello World")
    })
    
    r.Run()
}`,
    bestPractices: [
      'Implement CSP through middleware',
      'Use strict CSP policies',
      'Regular security audits',
      'Monitor CSP violations',
      'Keep dependencies updated',
    ],
  },
  {
    frameworkId: 'tornado',
    implementation: `import tornado.ioloop
  import tornado.web
  from tornado.web import RequestHandler
  
  class MainHandler(RequestHandler):
      def prepare(self):
          # Set the Content-Security-Policy header
          self.set_header('Content-Security-Policy', (
              "default-src 'self'; "
              "script-src 'self'; "
              "style-src 'self' 'unsafe-inline'; "
              "img-src 'self' https:; "
              "font-src 'self' https:; "
              "connect-src 'self'"
          ))
  
      def get(self):
          self.write("Hello, Tornado!")
  
  def make_app():
      return tornado.web.Application([
          (r'/', MainHandler),
      ])
  
  if __name__ == "__main__":
      app = make_app()
      app.listen(8888)
      tornado.ioloop.IOLoop.current().start()`,

    example: `import tornado.ioloop
  import tornado.web
  from tornado.web import RequestHandler
  
  class HelloWorldHandler(RequestHandler):
      def get(self):
          self.set_header('Content-Security-Policy', "default-src 'self'")
          self.write("Hello, World!")
  
  def make_app():
      return tornado.web.Application([
          (r'/', HelloWorldHandler),
      ])
  
  if __name__ == "__main__":
      app = make_app()
      app.listen(8888)
      tornado.ioloop.IOLoop.current().start()`,

    bestPractices: [
      'Set the CSP header in the `prepare` method of your `RequestHandler` to ensure it’s applied to every response',
      "Avoid using 'unsafe-inline' in your CSP for better security, and use nonces or hashes for inline scripts/styles",
      "Use 'Content-Security-Policy-Report-Only' in development to monitor violations without enforcing the policy",
      'Test your CSP implementation using online tools like Google CSP Evaluator',
      'Ensure that the policy is as restrictive as necessary, limiting external resources and using secure protocols like HTTPS',
    ],
  },
  {
    frameworkId: 'nestjs',
    implementation: `
      import { NestFactory } from '@nestjs/core';
      import { AppModule } from './app.module';
      import * as helmet from 'helmet';
  
      async function bootstrap() {
        const app = await NestFactory.create(AppModule);
  
        // Use helmet to set Content-Security-Policy headers
        app.use(helmet.contentSecurityPolicy({
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "https:"],
            fontSrc: ["'self'", "https:"],
            connectSrc: ["'self'"],
          }
        }));
  
        await app.listen(3000);
      }
      bootstrap();`,

    example: `
      import { NestFactory } from '@nestjs/core';
      import { AppModule } from './app.module';
      import * as helmet from 'helmet';
  
      async function bootstrap() {
        const app = await NestFactory.create(AppModule);
  
        // Set a simple Content-Security-Policy for the application
        app.use(helmet.contentSecurityPolicy({
          directives: {
            defaultSrc: ["'self'"],
          }
        }));
  
        await app.listen(3000);
      }
      bootstrap();`,

    bestPractices: [
      'Use the `helmet` middleware to set Content-Security-Policy headers in NestJS applications',
      "Avoid using 'unsafe-inline' and 'unsafe-eval' where possible for better security",
      "Test CSP implementation with 'Content-Security-Policy-Report-Only' mode to monitor violations during development",
      'Keep the CSP policy restrictive to minimize exposure to potential attacks',
      'Regularly review and update your CSP as new resources are added to the application',
      'Use tools like [CSP Evaluator](https://csp-evaluator.withgoogle.com/) to test and refine your CSP configuration',
    ],
  },
  {
    frameworkId: 'koa',
    implementation: `
      const Koa = require('koa');
      const app = new Koa();
  
      // Middleware to set Content-Security-Policy headers
      app.use(async (ctx, next) => {
        ctx.set('Content-Security-Policy', 
          "default-src 'self'; " +
          "script-src 'self' 'unsafe-eval' 'unsafe-inline'; " +
          "style-src 'self' 'unsafe-inline'; " +
          "img-src 'self' https:; " +
          "font-src 'self' https:; " +
          "connect-src 'self'");
        await next();
      });
  
      app.use(async ctx => {
        ctx.body = 'Hello, Koa!';
      });
  
      app.listen(3000);`,

    example: `
      const Koa = require('koa');
      const app = new Koa();
  
      // Simple example of setting CSP header
      app.use(async (ctx, next) => {
        ctx.set('Content-Security-Policy', "default-src 'self'");
        await next();
      });
  
      app.use(async ctx => {
        ctx.body = 'Hello, World!';
      });
  
      app.listen(3000);`,

    bestPractices: [
      'Use a middleware to set the CSP header globally in your Koa application',
      "Avoid using 'unsafe-inline' and 'unsafe-eval' for better security",
      "Use 'Content-Security-Policy-Report-Only' mode during development to monitor violations without enforcing the policy",
      'Limit the use of third-party resources by explicitly specifying trusted domains',
      'Test your CSP setup with tools like Google CSP Evaluator to ensure it is implemented securely',
      'Review and update the CSP periodically as new resources or dependencies are added',
    ],
  },
  {
    frameworkId: 'fastify',
    implementation: `
      const fastify = require('fastify')();
      const helmet = require('fastify-helmet');
  
      // Register fastify-helmet plugin for CSP
      fastify.register(helmet, {
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "https:"],
            fontSrc: ["'self'", "https:"],
            connectSrc: ["'self'"],
          }
        }
      });
  
      fastify.get('/', async (request, reply) => {
        return { hello: 'Fastify' };
      });
  
      fastify.listen(3000, (err, address) => {
        if (err) {
          fastify.log.error(err);
          process.exit(1);
        }
      });`,

    example: `
      const fastify = require('fastify')();
      const helmet = require('fastify-helmet');
  
      // Simple CSP example using fastify-helmet
      fastify.register(helmet, {
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"]
          }
        }
      });
  
      fastify.get('/', async (request, reply) => {
        return { message: 'Hello, Fastify!' };
      });
  
      fastify.listen(3000, (err, address) => {
        if (err) {
          fastify.log.error(err);
          process.exit(1);
        }
      });`,

    bestPractices: [
      'Use the `fastify-helmet` plugin to set Content-Security-Policy headers',
      "Avoid using 'unsafe-inline' and 'unsafe-eval' for better security practices",
      "Use 'Content-Security-Policy-Report-Only' mode during development to monitor violations without enforcing the policy",
      'Limit the use of third-party resources by explicitly specifying trusted sources in your CSP',
      "Test the CSP configuration with tools like Google CSP Evaluator to ensure it's secure",
      'Review and update the policy regularly as the application evolves or external dependencies are added',
    ],
  },
  {
    frameworkId: 'aspnet-core',
    implementation: `
      // CLI Command to add the necessary package
      // dotnet add package Microsoft.AspNetCore.HttpsPolicy
  
      using Microsoft.AspNetCore.Builder;
      using Microsoft.AspNetCore.Hosting;
      using Microsoft.Extensions.DependencyInjection;
      using Microsoft.Extensions.Hosting;
  
      public class Startup
      {
          public void ConfigureServices(IServiceCollection services)
          {
              // Add services required for CSP headers
              services.AddControllersWithViews();
          }
  
          public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
          {
              if (env.IsDevelopment())
              {
                  app.UseDeveloperExceptionPage();
              }
              else
              {
                  app.UseExceptionHandler("/Home/Error");
                  app.UseHsts();
              }
  
              // Use HTTPS redirection
              app.UseHttpsRedirection();
  
              // Add Content-Security-Policy header
              app.Use(async (context, next) =>
              {
                  context.Response.Headers.Add("Content-Security-Policy", 
                      "default-src 'self'; " +
                      "script-src 'self' 'unsafe-eval' 'unsafe-inline'; " +
                      "style-src 'self' 'unsafe-inline'; " +
                      "img-src 'self' https:; " +
                      "font-src 'self' https:; " +
                      "connect-src 'self'");
                  await next();
              });
  
              app.UseRouting();
              app.UseAuthorization();
  
              app.UseEndpoints(endpoints =>
              {
                  endpoints.MapControllerRoute(
                      name: "default",
                      pattern: "{controller=Home}/{action=Index}/{id?}");
              });
          }
      }
  
      public class Program
      {
          public static void Main(string[] args)
          {
              CreateHostBuilder(args).Build().Run();
          }
  
          public static IHostBuilder CreateHostBuilder(string[] args) =>
              Host.CreateDefaultBuilder(args)
                  .ConfigureWebHostDefaults(webBuilder =>
                  {
                      webBuilder.UseStartup<Startup>();
                  });
      }`,

    example: `
      using Microsoft.AspNetCore.Builder;
      using Microsoft.AspNetCore.Hosting;
      using Microsoft.Extensions.DependencyInjection;
      using Microsoft.Extensions.Hosting;
  
      public class Startup
      {
          public void ConfigureServices(IServiceCollection services)
          {
              services.AddControllersWithViews();
          }
  
          public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
          {
              app.Use(async (context, next) =>
              {
                  // Set a simple Content-Security-Policy header
                  context.Response.Headers.Add("Content-Security-Policy", "default-src 'self'");
                  await next();
              });
  
              app.UseRouting();
  
              app.UseEndpoints(endpoints =>
              {
                  endpoints.MapControllerRoute(
                      name: "default",
                      pattern: "{controller=Home}/{action=Index}/{id?}");
              });
          }
      }
  
      public class Program
      {
          public static void Main(string[] args)
          {
              CreateHostBuilder(args).Build().Run();
          }
  
          public static IHostBuilder CreateHostBuilder(string[] args) =>
              Host.CreateDefaultBuilder(args)
                  .ConfigureWebHostDefaults(webBuilder =>
                  {
                      webBuilder.UseStartup<Startup>();
                  });
      }`,

    bestPractices: [
      'Use the `app.Use()` middleware to add the Content-Security-Policy header globally to all responses',
      "Avoid using 'unsafe-inline' and 'unsafe-eval' to reduce the attack surface for XSS attacks",
      "Consider using 'Content-Security-Policy-Report-Only' in development to log policy violations without enforcing them",
      'Use secure defaults such as HTTPS (`https:`) for resources and avoid wildcard domains (`*`)',
      'Regularly review and refine the CSP to adapt to new content and third-party services in your app',
      "Test the CSP policy using tools like Google's [CSP Evaluator](https://csp-evaluator.withgoogle.com/)",
    ],
  },
  {
    frameworkId: 'aspnet-mvc',
    implementation: `
      // CLI Command to add the necessary package
      // dotnet add package Microsoft.AspNetCore.HttpsPolicy
  
      using System.Web.Mvc;
      using System.Web.Routing;
  
      public class MvcApplication : System.Web.HttpApplication
      {
          protected void Application_Start()
          {
              AreaRegistration.RegisterAllAreas();
              RouteConfig.RegisterRoutes(RouteTable.Routes);
  
              // Add Content-Security-Policy header globally
              GlobalFilters.Filters.Add(new ContentSecurityPolicyFilter());
          }
      }
  
      // Custom filter to add CSP headers
      public class ContentSecurityPolicyFilter : ActionFilterAttribute
      {
          public override void OnResultExecuting(ResultExecutingContext filterContext)
          {
              filterContext.HttpContext.Response.Headers["Content-Security-Policy"] = 
                  "default-src 'self'; " +
                  "script-src 'self' 'unsafe-eval' 'unsafe-inline'; " +
                  "style-src 'self' 'unsafe-inline'; " +
                  "img-src 'self' https:; " +
                  "font-src 'self' https:; " +
                  "connect-src 'self'";
  
              base.OnResultExecuting(filterContext);
          }
      }`,

    example: `
      using System.Web.Mvc;
      using System.Web.Routing;
  
      public class MvcApplication : System.Web.HttpApplication
      {
          protected void Application_Start()
          {
              AreaRegistration.RegisterAllAreas();
              RouteConfig.RegisterRoutes(RouteTable.Routes);
  
              // Simple CSP filter example
              GlobalFilters.Filters.Add(new ContentSecurityPolicyFilter());
          }
      }
  
      // Simple CSP header filter
      public class ContentSecurityPolicyFilter : ActionFilterAttribute
      {
          public override void OnResultExecuting(ResultExecutingContext filterContext)
          {
              filterContext.HttpContext.Response.Headers["Content-Security-Policy"] = 
                  "default-src 'self'";
  
              base.OnResultExecuting(filterContext);
          }
      }`,

    bestPractices: [
      'Use a custom filter (e.g., `ContentSecurityPolicyFilter`) to globally add the CSP header to all responses',
      "Avoid using 'unsafe-inline' and 'unsafe-eval' in the policy wherever possible",
      "Use 'Content-Security-Policy-Report-Only' mode in development to log violations without blocking content",
      'Consider using HTTPS for all resources by setting `https:` in your CSP directives',
      'Review and refine the CSP policy regularly to adapt to new dependencies and resources',
      "Test the CSP configuration with tools like Google's [CSP Evaluator](https://csp-evaluator.withgoogle.com/)",
    ],
  },
  {
    frameworkId: 'symfony',
    implementation: `
      // CLI Command to add the necessary package
      // composer require symfony/asset
  
      use Symfony\Component\HttpFoundation\Response;
      use Symfony\Component\HttpKernel\Event\RequestEvent;
      use Symfony\Component\EventDispatcher\EventSubscriberInterface;
      use Symfony\Component\HttpKernel\KernelEvents;
  
      class ContentSecurityPolicySubscriber implements EventSubscriberInterface
      {
          public static function getSubscribedEvents()
          {
              // Respond to kernel.request event
              return [
                  KernelEvents::REQUEST => 'onKernelRequest',
              ];
          }
  
          public function onKernelRequest(RequestEvent $event)
          {
              $response = $event->getResponse();
  
              // Set Content-Security-Policy header
              $response->headers->set('Content-Security-Policy', 
                  "default-src 'self'; " +
                  "script-src 'self' 'unsafe-eval' 'unsafe-inline'; " +
                  "style-src 'self' 'unsafe-inline'; " +
                  "img-src 'self' https:; " +
                  "font-src 'self' https:; " +
                  "connect-src 'self'"
              );
          }
      }
  
      // Register the subscriber in services.yaml
      // services.yaml
      // App\EventSubscriber\ContentSecurityPolicySubscriber:
      //     tags:
      //         - { name: 'kernel.event_subscriber' }`,

    example: `
      use Symfony\Component\HttpFoundation\Response;
      use Symfony\Component\HttpKernel\Event\RequestEvent;
      use Symfony\Component\EventDispatcher\EventSubscriberInterface;
      use Symfony\Component\HttpKernel\KernelEvents;
  
      class ContentSecurityPolicySubscriber implements EventSubscriberInterface
      {
          public static function getSubscribedEvents()
          {
              return [
                  KernelEvents::REQUEST => 'onKernelRequest',
              ];
          }
  
          public function onKernelRequest(RequestEvent $event)
          {
              $response = $event->getResponse();
              // Simple CSP header example
              $response->headers->set('Content-Security-Policy', "default-src 'self'");
          }
      }
  
      // Register this subscriber in services.yaml
      // services.yaml
      // App\EventSubscriber\ContentSecurityPolicySubscriber:
      //     tags:
      //         - { name: 'kernel.event_subscriber' }`,

    bestPractices: [
      'Create an event subscriber to handle the addition of the Content-Security-Policy header globally',
      "Avoid using 'unsafe-inline' and 'unsafe-eval' in your CSP header to minimize vulnerabilities",
      "Use 'Content-Security-Policy-Report-Only' in development to track violations without blocking content",
      'Review the CSP regularly as new resources and external services are added to your application',
      'Ensure that all external resources (scripts, images, styles, etc.) are loaded over HTTPS',
      "Test the CSP header using tools like Google's [CSP Evaluator](https://csp-evaluator.withgoogle.com/) to verify its effectiveness",
    ],
  },
  {
    frameworkId: 'codeigniter',
    implementation: `
      // CLI Command to add the necessary package (if needed for your setup)
      // composer require codeigniter4/framework
  
      use CodeIgniter\Config\BaseConfig;
      use CodeIgniter\HTTP\ResponseInterface;
  
      class Security extends \CodeIgniter\Filters\FilterInterface
      {
          public function before(\CodeIgniter\HTTP\RequestInterface $request, $arguments = null)
          {
              // Set the Content-Security-Policy header globally
              service('response')->setHeader('Content-Security-Policy', 
                  "default-src 'self'; " +
                  "script-src 'self' 'unsafe-eval' 'unsafe-inline'; " +
                  "style-src 'self' 'unsafe-inline'; " +
                  "img-src 'self' https:; " +
                  "font-src 'self' https:; " +
                  "connect-src 'self'");
  
              return null;
          }
  
          public function after(\CodeIgniter\HTTP\RequestInterface $request, ResponseInterface $response, $arguments = null)
          {
              // You can add headers here if needed for the response
          }
      }
  
      // Register the filter in app/Config/Filters.php
      // $filters->add('csp', \App\Filters\Security::class);`,

    example: `
      use CodeIgniter\Config\BaseConfig;
      use CodeIgniter\HTTP\ResponseInterface;
  
      class Security extends \CodeIgniter\Filters\FilterInterface
      {
          public function before(\CodeIgniter\HTTP\RequestInterface $request, $arguments = null)
          {
              // Simple example of adding a CSP header globally
              service('response')->setHeader('Content-Security-Policy', "default-src 'self'");
              return null;
          }
  
          public function after(\CodeIgniter\HTTP\RequestInterface $request, ResponseInterface $response, $arguments = null)
          {
              // Add response modifications if needed
          }
      }
  
      // Register in app/Config/Filters.php
      // $filters->add('csp', \App\Filters\Security::class);`,

    bestPractices: [
      'Use a custom filter to set the `Content-Security-Policy` header globally for all requests',
      "Avoid 'unsafe-inline' and 'unsafe-eval' wherever possible for better security",
      "Use 'Content-Security-Policy-Report-Only' mode in development to monitor violations without enforcing them",
      'Regularly review your CSP configuration as your application evolves, especially when adding new dependencies',
      'Ensure that all external resources are served over HTTPS and specify secure source domains',
      "Test your CSP using tools like [CSP Evaluator](https://csp-evaluator.withgoogle.com/) to ensure it's correctly implemented",
    ],
  },
  {
    frameworkId: 'rails',
    implementation: `
      // CLI Command to add the necessary package (if needed for your setup)
      // gem install secure_headers
  
      class ApplicationController < ActionController::Base
        before_action :set_csp_headers
  
        private
  
        def set_csp_headers
          # Setting Content-Security-Policy headers
          response.headers['Content-Security-Policy'] = 
            "default-src 'self'; " +
            "script-src 'self' 'unsafe-eval' 'unsafe-inline'; " +
            "style-src 'self' 'unsafe-inline'; " +
            "img-src 'self' https:; " +
            "font-src 'self' https:; " +
            "connect-src 'self'"
        end
      end`,

    example: `
      class ApplicationController < ActionController::Base
        before_action :set_csp_headers
  
        private
  
        def set_csp_headers
          # Simple Content-Security-Policy header example
          response.headers['Content-Security-Policy'] = "default-src 'self'"
        end
      end`,

    bestPractices: [
      'Set the CSP headers globally using a before action in the ApplicationController to ensure every response is covered',
      "Avoid using 'unsafe-inline' and 'unsafe-eval' in your CSP header to mitigate potential security risks",
      "Test your CSP setup in 'Content-Security-Policy-Report-Only' mode in development to monitor violations without enforcing the policy",
      'Regularly audit your CSP policy, especially when adding new resources or third-party scripts',
      'Ensure external resources are loaded over HTTPS and avoid using wildcard sources (e.g., `*`)',
      'Use tools like [CSP Evaluator](https://csp-evaluator.withgoogle.com/) to ensure your CSP policy is secure',
    ],
  },
  {
    frameworkId: 'actix',
    implementation: `
      // Add dependencies in your Cargo.toml
      // [dependencies]
      // actix-web = "4.0"
      // actix-service = "2.0"
      // actix-http = "3.0"
  
      use actix_web::{web, App, HttpServer, HttpResponse, HttpRequest, Result};
      use actix_service::Service;
      use actix_http::http::header::{HeaderValue, CONTENT_SECURITY_POLICY};
  
      // Middleware to set CSP headers
      async fn csp_middleware(req: HttpRequest, srv: &web::Data<AppState>, mut res: HttpResponse) -> HttpResponse {
          res.headers_mut().insert(
              CONTENT_SECURITY_POLICY,
              HeaderValue::from_static("default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' https:; font-src 'self' https:; connect-src 'self'"),
          );
          res
      }
  
      #[actix_web::main]
      async fn main() -> std::io::Result<()> {
          HttpServer::new(|| {
              App::new()
                  .wrap_fn(csp_middleware) // Apply middleware to every request
                  .route("/", web::get().to(|| async { HttpResponse::Ok().body("Hello, world!") }))
          })
          .bind("127.0.0.1:8080")?
          .run()
          .await
      }`,

    example: `
      use actix_web::{web, App, HttpServer, HttpResponse, HttpRequest, Result};
      use actix_service::Service;
      use actix_http::http::header::{HeaderValue, CONTENT_SECURITY_POLICY};
  
      // Simple CSP middleware example
      async fn csp_middleware(req: HttpRequest, mut res: HttpResponse) -> HttpResponse {
          res.headers_mut().insert(
              CONTENT_SECURITY_POLICY,
              HeaderValue::from_static("default-src 'self'"),
          );
          res
      }
  
      #[actix_web::main]
      async fn main() -> std::io::Result<()> {
          HttpServer::new(|| {
              App::new()
                  .wrap_fn(csp_middleware) // Apply middleware to every request
                  .route("/", web::get().to(|| async { HttpResponse::Ok().body("Hello, world!") }))
          })
          .bind("127.0.0.1:8080")?
          .run()
          .await
      }`,

    bestPractices: [
      'Use middleware to add the `Content-Security-Policy` header to every response globally',
      'Avoid using `unsafe-inline` and `unsafe-eval` unless absolutely necessary, to minimize security risks',
      'Test the CSP policy using `Content-Security-Policy-Report-Only` mode during development to track violations without enforcement',
      'Ensure all external resources are loaded over HTTPS and specify trusted source domains',
      'Regularly audit and review the CSP configuration as your application evolves',
      'Use tools like [CSP Evaluator](https://csp-evaluator.withgoogle.com/) to evaluate the security of your CSP configuration',
    ],
  },
];
