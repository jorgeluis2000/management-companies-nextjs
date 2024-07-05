# Gestión de Ingresos y Gastos en Empresa

Este proyecto utiliza Next.js con autenticación mediante NextAuth y Auth0, Apollo Server y Apollo Client para comunicarse con GraphQL, y Prisma para la ORM y consultas a la base de datos PostgreSQL. El objetivo principal es gestionar los ingresos y gastos de una empresa, con roles de usuario (ADMIN y USER), y funcionalidades adicionales como la generación de reportes de transacciones.

## Funcionalidades

### Autenticación

- Login y gestión de sesiones utilizando NextAuth y Auth0.
- Roles de usuario: ADMIN y USER.

### Gestión de Ingresos y Gastos

- Registro y visualización de transacciones financieras.
- Categorización de ingresos y gastos.

### Panel de Administración (ADMIN)

- Acceso completo a todas las funcionalidades del sistema.
- Posibilidad de generar reportes detallados.

### Panel de Usuario (USER)

- Acceso limitado según los permisos asignados.
- No tiene acceso al apartado de comunidad para CRUD de usuarios.

### Apartado de Comunidad

- Operaciones CRUD para usuarios y gestión de roles (disponible solo para ADMIN).

## Tecnologías Utilizadas

### Frontend

- Next.js para renderizado del lado del servidor y manejo de rutas.
- Apollo Client para gestionar peticiones GraphQL desde el cliente.

### Backend

- Apollo Server para implementar el servidor GraphQL.
- Prisma para la ORM y consultas a la base de datos PostgreSQL.

## Configuración del Proyecto

1. Clonar el repositorio.

```bash
git clone https://github.com/jorgeluis2000/management-companies-nextjs.git
cd management-companies-nextjs
```

2. Instalar dependencias.

```bash
pnpm install
npm install
```

3. Configurar variables de entorno:

Renombrar `.env` y completa las variables necesarias como las credenciales Auth0 y la URL de la base de datos.

```env
NEXTAUTH_SECRET=*****************************************************
AUTH0_SECRET=********************************

NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL='https://******.com'
AUTH0_CLIENT_ID='********************************'
AUTH0_CLIENT_SECRET='********************************'

DATABASE_URL="postgresql://<user>:<password>@<domain>:<port>/<name_db>?schema=public"

DIRECT_URL="postgresql://<user>:<password>@<domain>:<port>/<name_db>?schema=public"
```

4. Configuración de la base de datos.

Se debe ejecutar el comando.

```bash
# usando pnpm
pnpm prisma:push
# o usando npm
npm run prisma:push
```

Luego hay que usar el comando que insertara los valores por defecto y creara un usuario ADMIN de pruebas para usar.

```bash
# usando pnpm
pnpm prisma:seed
# o usando npm
npm run prisma:seed
```

Estas son las credenciales del usuario que se genera:

```text
user: admin@gmail.com
password: 1234
```

Ahora habrá que iniciar el proyecto, para eso hay 2 alternativas. La primera es ejecutando el comando:

```bash
# usando pnpm
pnpm build & pnpm start
# o usando npm
npm run build & npm run start
```

La otra alternativa es usando docker compose. Solo tienes que asegurarte de que el archivo de variables de entorno se llame **.env.local** y ejecutar el siguiente comando:

```bash
docker compose up -d --build
```

> [!NOTE]
> Recuerda configurar tu **supabase** y auth0 con los datos correctos para que este proyecto funcione correctamente.

## Diagrama de Entidad-Relación

![Diagrama de Entidad-Relación](/public/db_prisma.svg)

El diagrama muestra un sistema que maneja transacciones, usuarios y configuraciones de usuario. Aquí está una explicación de las tablas y sus relaciones:

## Tablas

### Transaction

- **id**: String, identificador único de la transacción.
- **concept**: String, concepto de la transacción.
- **amount**: Float, cantidad de la transacción.
- **typeTransaction**: Tipo de transacción (podría ser un ENUM).
- **createdAt**: DateTime, fecha y hora de creación.
- **updatedAt**: DateTime, fecha y hora de la última actualización.

### User

- **id**: String, identificador único del usuario.
- **idAuth0**: String, identificador del usuario en Auth0.
- **email**: String, correo electrónico del usuario.
- **name**: String, nombre del usuario.
- **phone**: String, número de teléfono del usuario.
- **password**: String, contraseña del usuario.
- **image**: String, URL de la imagen del usuario.
- **role**: Role (podría ser un ENUM), rol del usuario (ADMIN o USER).
- **createdAt**: DateTime, fecha y hora de creación.
- **updatedAt**: DateTime, fecha y hora de la última actualización.

### UserConfig

- **id**: String, identificador único de la configuración del usuario.
- **theme**: UserTheme (podría ser un ENUM), tema de la configuración del usuario.

### Language

- **code**: String, código del idioma.
- **name**: String, nombre del idioma.

### TimeZone

- **zone**: String, zona horaria.
- **utcOffset**: String, offset de UTC de la zona horaria.

## Relaciones

### TransactionToUser

- Relaciona la tabla `Transaction` con la tabla `User`, indicando que una transacción pertenece a un usuario.

### UserToUserConfig

- Relaciona la tabla `User` con la tabla `UserConfig`, indicando que un usuario tiene una configuración.

### LanguageToUserConfig

- Relaciona la tabla `Language` con la tabla `UserConfig`, indicando que una configuración de usuario puede tener un idioma asociado.

### TimeZoneToUserConfig

- Relaciona la tabla `TimeZone` con la tabla `UserConfig`, indicando que una configuración de usuario puede tener una zona horaria asociada.

## Explicación de la Funcionalidad

- **Transactions**: Esta tabla almacena las transacciones financieras, incluyendo el concepto, monto, tipo y fechas de creación y actualización.
- **Users**: Esta tabla contiene la información de los usuarios, incluyendo detalles de autenticación y perfil.
- **UserConfig**: Esta tabla almacena configuraciones específicas para los usuarios, como temas de interfaz.
- **Language**: Esta tabla define los idiomas disponibles para la configuración de los usuarios.
- **TimeZone**: Esta tabla define las zonas horarias disponibles para la configuración de los usuarios.

Las relaciones entre estas tablas permiten que cada transacción esté asociada a un usuario específico, y cada usuario puede tener configuraciones personalizadas que incluyen idioma y zona horaria.
