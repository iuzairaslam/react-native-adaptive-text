# Example app (`example/`)

This folder is a standard runnable [**React Native**](https://reactnative.dev) app that **depends on the parent package** (`"react-native-adaptive-text": "file:.."`) and **`App.tsx`** demonstrates **`AdaptiveText`**, **`AdaptiveTextTheme`**, **`useAdaptiveForegroundColor`**, palette + **APCA**. See the [root README](../README.md) for full API docs. After changing the library’s exported types, run **`npm run build`** in the repo root so **`dist/`** matches what TypeScript reads from **`types`**.

From this directory:

```bash
npm install
npx pod-install   # iOS only
npm run ios
```

**Physical Android (“Unable to load script”)** — Metro must be running **before** the app loads the bundle, and USB needs port forwarding:

1. **Terminal 1:** `npm start` (runs `adb reverse tcp:8081 tcp:8081` automatically, then Metro on port **8081**).
2. **Terminal 2:** `npm run android:install` (builds/installs without trying to open a second Metro window).

If it still fails: unplug/replug USB, run `adb reverse tcp:8081 tcp:8081` again, then **Dev menu → Reload**. On the device, **Dev settings → Debug server host & port** should be **empty** or **`localhost:8081`** when using USB reverse.

**iOS Simulator** — Run CocoaPods once (`cd ios && pod install`). Then **Terminal 1:** `npm start`; **Terminal 2:** `npm run ios:install` (or a single `npm run ios` if Metro can open in another window). The CLI picked **iPhone 16 Pro (iOS 18.6)** when none were booted; use `--simulator "Device Name"` to choose another.

---

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
