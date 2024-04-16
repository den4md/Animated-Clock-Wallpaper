# Animated Clock on Customizable Background

<img src="https://i.ibb.co/28kwzbY/win10-stylized-like-win11.gif" alt="Animated example of wallpaper on Windows 10 stylized like Windows 11" width="720px">

This is a personal project aimed at providing a simple animated clock with a customizable (and cool) background. The project leverages JavaScript to create the animated clock functionality.

## Contents
- [Features](#features)
- [Usage](#usage)
- [Development Guide](#development-guide)
- [How It Works](#how-it-works)
- [Contributions](#contributions)

## Features
- Customizable clock size.
- Background image customization in various formats including JPG, PNG, GIF, GIFV, WEBP, and any other, if you're brave enough.
- Option to enable or disable AM/PM format.
- Show or hide seconds on the clock.
- Set a custom number separator for the time display.
- Adjustable clock animation speed.

## Usage
To use this project:
1. Install [LivelyWallpaper](https://github.com/rocksdanister/lively/releases/latest).
2. Go to the [latest release](https://github.com/den4md/animated-clock-wallpaper/releases/latest) page.
3. Download the latest version .zip archive.
4. Drag & Drop it onto LivelyWallpaper.
5. Right-Click on the added wallpaper -> Customize -> Background image -> Click on the button nearby and choose any background image that you like to use.

## Development Guide
There are many ways to organize your development. Here what I would recommend to myself-from-the-past:
1. Clone the repository to your local machine.
2. Prepare some cool wallpaper images in the `wallpapers` directory.
3. Install [LivelyWallpaper](https://github.com/rocksdanister/lively).
4. Open the LivelyWallpaper app.
5. Navigate to Settings -> General -> File -> Wallpaper Directory and click on the button to open the folder in File Explorer.
6. Open the `Library\wallpapers` directory.
7. Create a symlink named randomly (e.g., '00000000.000') to your repository folder. (Powershell example command: `New-Item -ItemType SymbolicLink -Path '.\0000000.000' -Target 'C:\Users\me\Projects\Animated Clock Wallpaper\'`).
8. Open the repository with your IDE or text editor and feel free to edit anything you want.
9. Apply the Animated Clock Wallpaper in the LivelyWallpaper app. (To apply your changes, you have to re-apply the wallpaper; configs are preserved unless you change them, in which case you have to reset them in the Customize Menu).
10. Enjoy your creativity.

Alternatively, you can open the project in [VSCode for the Web](https://vscode.dev/) (use the [CodeSwing](https://github.com/lostintangent/codeswing) extension).

## How It Works
The project uses JavaScript to dynamically update the clock based on the configured parameters. It provides a simple yet elegant way to display the time on a customizable background.

## Contributions
Feel free to fork this project or create new issues for bug reports or feature requests. Your contributions are welcome and appreciated!
✌😉🚀
