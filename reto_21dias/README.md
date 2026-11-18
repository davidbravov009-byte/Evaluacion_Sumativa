# Reto 21 días

Aplicación móvil creada con React Native, Expo y TypeScript para registrar el cumplimiento de hábitos durante 21 días.

## Funcionalidades

- Marca y desmarca cuatro hábitos predefinidos.
- Calcula el progreso diario y el avance global del reto.
- Navegación mediante Stack, Tabs y Drawer.
- Tema claro, oscuro y automático.
- Datos locales tipados sin API ni base de datos.
- Componentes reutilizables con propiedades TypeScript.

## Arquitectura

- `src/app/`: rutas y layouts de Expo Router.
- `src/hooks/use-habits.tsx`: estado compartido y lógica de hábitos.
- `src/hooks/use-theme.tsx`: selección y resolución del tema.
- `src/components/`: HabitCard, ProgressCard, MenuItem y componentes temáticos.
- `src/constants/theme.ts`: paleta y espaciado compartidos.

## Ejecución

```bash
npm install
npx expo start
```

Puedes abrir la aplicación con Expo Go, un emulador Android o el navegador web.

## Generar APK con EAS

```bash
npx eas-cli login
npx eas-cli build:configure
npx eas-cli build --platform android --profile preview
```

El perfil `preview` de `eas.json` genera un APK interno listo para distribuir.

## Stack técnico

Expo, Expo Router, React Native, NativeWind, Tailwind CSS, React Navigation Drawer y TypeScript.
