export interface Framework {
  id: string;
  name: string;
  languageId: string;
  icon: string;
}

export const frameworks: Framework[] = [
  // Python
  { id: 'django', name: 'Django', languageId: 'python', icon: 'layout' },
  { id: 'flask', name: 'Flask', languageId: 'python', icon: 'flask' },
  { id: 'fastapi', name: 'FastAPI', languageId: 'python', icon: 'zap' },
  { id: 'pyramid', name: 'Pyramid', languageId: 'python', icon: 'triangle' },
  { id: 'tornado', name: 'Tornado', languageId: 'python', icon: 'wind' },
  
  // Node.js
  { id: 'express', name: 'Express.js', languageId: 'nodejs', icon: 'server' },
  { id: 'nextjs', name: 'Next.js', languageId: 'nodejs', icon: 'triangle' },
  { id: 'nestjs', name: 'NestJS', languageId: 'nodejs', icon: 'feather' },
  { id: 'koa', name: 'Koa', languageId: 'nodejs', icon: 'box' },
  { id: 'fastify', name: 'Fastify', languageId: 'nodejs', icon: 'zap' },
  
  // C#
  { id: 'aspnet-core', name: 'ASP.NET Core', languageId: 'csharp', icon: 'window' },
  { id: 'aspnet-mvc', name: 'ASP.NET MVC', languageId: 'csharp', icon: 'layout-template' },
  { id: 'carter', name: 'Carter', languageId: 'csharp', icon: 'box' },
  
  // Java
  { id: 'spring-boot', name: 'Spring Boot', languageId: 'java', icon: 'leaf' },
  { id: 'spring-mvc', name: 'Spring MVC', languageId: 'java', icon: 'git-branch' },
  { id: 'jakarta-ee', name: 'Jakarta EE', languageId: 'java', icon: 'coffee' },
  { id: 'micronaut', name: 'Micronaut', languageId: 'java', icon: 'cpu' },
  { id: 'quarkus', name: 'Quarkus', languageId: 'java', icon: 'zap' },
  
  // PHP
  { id: 'laravel', name: 'Laravel', languageId: 'php', icon: 'layout' },
  { id: 'symfony', name: 'Symfony', languageId: 'php', icon: 'infinity' },
  { id: 'codeigniter', name: 'CodeIgniter', languageId: 'php', icon: 'flame' },
  { id: 'slim', name: 'Slim', languageId: 'php', icon: 'feather' },
  { id: 'yii', name: 'Yii', languageId: 'php', icon: 'y' },
  
  // Go
  { id: 'gin', name: 'Gin', languageId: 'go', icon: 'box' },
  { id: 'echo', name: 'Echo', languageId: 'go', icon: 'radio' },
  { id: 'fiber', name: 'Fiber', languageId: 'go', icon: 'network' },
  { id: 'chi', name: 'Chi', languageId: 'go', icon: 'route' },
  { id: 'buffalo', name: 'Buffalo', languageId: 'go', icon: 'box' },
  
  // Ruby
  { id: 'rails', name: 'Ruby on Rails', languageId: 'ruby', icon: 'train' },
  { id: 'sinatra', name: 'Sinatra', languageId: 'ruby', icon: 'music' },
  { id: 'hanami', name: 'Hanami', languageId: 'ruby', icon: 'flower' },
  
  // Rust
  { id: 'actix', name: 'Actix Web', languageId: 'rust', icon: 'activity' },
  { id: 'rocket', name: 'Rocket', languageId: 'rust', icon: 'rocket' },
  { id: 'warp', name: 'Warp', languageId: 'rust', icon: 'wind' },
  
  // Scala
  { id: 'play', name: 'Play Framework', languageId: 'scala', icon: 'play' },
  { id: 'akka-http', name: 'Akka HTTP', languageId: 'scala', icon: 'activity' },
  { id: 'http4s', name: 'Http4s', languageId: 'scala', icon: 'server' },
  
  // Kotlin
  { id: 'ktor', name: 'Ktor', languageId: 'kotlin', icon: 'box' },
  { id: 'spring-boot-kotlin', name: 'Spring Boot Kotlin', languageId: 'kotlin', icon: 'leaf' },
  { id: 'micronaut-kotlin', name: 'Micronaut Kotlin', languageId: 'kotlin', icon: 'cpu' },
  
  // Swift
  { id: 'vapor', name: 'Vapor', languageId: 'swift', icon: 'cloud' },
  { id: 'kitura', name: 'Kitura', languageId: 'swift', icon: 'box' },
  { id: 'perfect', name: 'Perfect', languageId: 'swift', icon: 'circle' },
  
  // Dart
  { id: 'shelf', name: 'Shelf', languageId: 'dart', icon: 'box' },
  { id: 'aqueduct', name: 'Aqueduct', languageId: 'dart', icon: 'droplet' },
  
  // Elixir
  { id: 'phoenix', name: 'Phoenix', languageId: 'elixir', icon: 'feather' },
  { id: 'plug', name: 'Plug', languageId: 'elixir', icon: 'plug' },
  
  // Clojure
  { id: 'ring', name: 'Ring', languageId: 'clojure', icon: 'circle' },
  { id: 'luminus', name: 'Luminus', languageId: 'clojure', icon: 'moon' },
  
  // Haskell
  { id: 'yesod', name: 'Yesod', languageId: 'haskell', icon: 'triangle' },
  { id: 'servant', name: 'Servant', languageId: 'haskell', icon: 'server' },
  { id: 'scotty', name: 'Scotty', languageId: 'haskell', icon: 'box' }
];