# spCoinSimpleSwapTest ©<img src="https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/boot1.png" width="6%" align= "right">
---
### Directory of Information
Find your way using our directory below:
<b>
- [Legal Disclaimer & Copyright Agreement ©](#copyright-agreement)
- [Repository](#repository-information)
- [About](#about)
- [Installation Documentation](#installation)
- [Command Menu Shortcuts](#command-menu-shortcuts)
- [Package Contents](#package-contents)
- [Running the Package](#running-the-package)
- [Video Tutorial](#video-tutorial)
- [About the Author](#about-the-authors)
 </b>
 
 Name  | Key Contact
------------- | -------------
Robert Lanson | sponsorcoin@yahoo.com

- - - -
### Copyright Agreement<img src="https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/policeman.png" width="5%" align= "right">
<b>Package [<b>spCoinSimpleSwapTest</b>](https://github.com/sponsorCoinAdmin/spCoinSimpleSwapTest/tree/main) ©</b> 

Read all copyright clauses and information before continuing to download and/or interact with this software. All interaction and use of such software hereon forward assumes complete agreement to all copyright terms and general conditions as specified. 

- This program is permissible for re-distribution provided this copyright/license header is present in any redistribution of this package, in partial or entirely.  
- There exists no warranty or guaranty of any kind in any way and is not assured to be as required and may not work exactly as designed for all operating systems employing various potentially conflicting software programs and entities.  
- It is recommended to read the contents of the scripts to be assured of the installation process and what will be installed. 
- The user is free to modify the code as required. 
- There may not be any associated uninstal script. Uninstalling any such software or its effects on any system is the system owners responsibility.
- It is recommended to be installed on a test system in a test environment before promoting to a production environment.
- There is absolutely no guarantee of profit in any way, implying there should not be any expectation of financial gain while utilizing this application and associated development kit.</b><img src="https://github.com/sponsorCoinAdmin/spCoinImages/blob/main//caution.png" width="6%" align= "right"></b>

<b>**INSTALL AT YOUR OWN RISK: END OF DISCLAIMER</b>
 - - - -
### Repository Information<img src="https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/repository.png" width="5%" align= "right">
- <b>https://github.com/sponsorCoinAdmin/spCoinSimpleSwapTest</b>
- - - -
### About<img src="https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/aboutMickey.png" width="6%" align= "right">
- Version: 1.0.0
- Release Date: Sept 1st 2023
- Purpose: [<b>spCoinSimpleSwapTest</b>](https://github.com/sponsorCoinAdmin/spCoinSimpleSwapTest/tree/main) is a Simple Ethereum Swap Test.
- Description: [<b>spCoinSimpleSwapTest</b>](https://github.com/sponsorCoinAdmin/spCoinSimpleSwapTest/tree/main) is a Simple Ethereum Swap Test utilizing <b>"Uniswap's Universal Router"</b>.
 - - - -
### Installation<img src="https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/installation.png" width="7%" align= "right">
- Please Note: For a comprehensive demonstration of the installation process, refer to the 'Video Tutorial' section below.
- Clone the package to your local computer:
- Change your current directory to {root installaction}/[<b>spCoinSimpleSwapTest</b>](https://github.com/sponsorCoinAdmin/spCoinSimpleSwapTest/tree/main)
- Next install the text menu driven system as follows:
    - execute the following command: <b>'. ./[<b>spCoinEnvSetup.sh</b>'](https://github.com/sponsorCoinAdmin/spCoinSetupEnv/blob/main/spCoinEnvSetup.sh)</b>
- <b>Notes:
    - This installation assumes operation under bash or gitBash for windows</b>
    - The Menu System modifies the ~/.gitbash.rc file to and an environment path link
 - - - -
### Environment setup<img src="https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/setup6.png" width="7%" align= "right">
- Setup for the simple swap test requires setting up environment file .env.
- To do so a key is required for network access.
- For example, an Infura key entry would look look like:
  - <b>NFURA_API_MAIN_NET_ACCESS_KEY="<Your Infura Key Here></b>"
 - - - -
### Command Menu Shortcuts<img src="https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/menu 4.jpg" width="7%" align= "right">
The <b>All Command Menus</b> are a list of shortcut alias commands for administering the [<b>'spCoinSimpleSwapTest'</b>](https://github.com/sponsorCoinAdmin/spCoinSimpleSwapTest/tree/main) project.
- If the menu system is installed correctly, simply type short cut alias <b>'m \<enter>'</b> in a bash window and the following should appear:
#### The Main Menu
![<b>Author Image</b>](https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/mainMenu.jpg)
The above menu is simply a menu of many submenus. Each entry is an alias to an alternate command menu short cut. Each submenu exists under the repositories’ spCoinSimpleSwapTest/env directory. These menus cane be more completely described in the file [<b>./setupEnv/ReadMe.md</b>](https://github.com/sponsorCoinAdmin/spCoinSetupEnv/blob/main/README.md).
- - - -
### Package Contents (Important Files Only)<img src="https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/contents.png" width="6%" align= "right">
- [<b>README.md</b>](https://github.com/sponsorCoinAdmin/spCoinSimpleSwapTest/edit/main/README.md) ~ The Readme Documentation is this documentation.
- [<b>./scripts/spCoinSetup.sh</b>](https://github.com/sponsorCoinAdmin/spCoinSimpleSwapTest/blob/main/scripts/spCoinSetup.sh)  ~ This file is to be run from the scripts directory and downloads the [<b>spCoinSimpleSwapTest</b>](https://github.com/sponsorCoinAdmin/spCoinSimpleSwapTest/tree/main</b>) repository to local. Next it executes the [<b>spCoinEnvSetup.sh</b>](https://github.com/sponsorCoinAdmin/spCoinSetupEnv/blob/main/spCoinEnvSetup.sh) file for environment setup.
- [<b>./setupEnv/</b>](https://github.com/sponsorCoinAdmin/spCoinSetupEnv/tree/ef96401c818432d0fe6ff1d6642fab31f44b6fb5) ~ This directory is a mounted submodule containing files for environment and menu execution commands. refer to the [<b>./setupEnv/ReadMe.md</b>](https://github.com/sponsorCoinAdmin/spCoinSetupEnv/blob/main/README.md) for a more complete Overview.
- [<b>./setupEnv/spCoinEnvSetup.sh</b>](https://github.com/sponsorCoinAdmin/spCoinSetupEnv) ~ This shell creates the environment variable settings and sets up the menus for testing and execution commands in [<b>'spCoinSimpleSwapTest'</b>](https://github.com/sponsorCoinAdmin/spCoinSimpleSwapTest/tree/main).
 - - - -
### Running the Package<img src="https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/running2.png" width="6%" align= "right">
It is recommended to read the contents of the scripts to be assured of the installation process and what will be installed.  There may not be an associated uninstalling script, so uninstalling is the owner’s responsibility.
  - Add the .env file to the package directory <b>[<b>spCoinSimpleSwapTest</b>](https://github.com/sponsorCoinAdmin/spCoinSimpleSwapTest/tree/main)'</b>. This adds the required network access keys.

After a new Linux/gitBash successful installation you can start the program directly in two ways as follows:
    - 1. cd into the Package <b>[<b>'spCoinSimpleSwapTest'</b>](https://github.com/sponsorCoinAdmin/spCoinSimpleSwapTest/tree/main)'</b> and execute the command <b>'node scripts/01_simpleSwap.js''</b>.
    - 2. Running the menu test display, <b>'tm'</b>, command will list the testing options.
       running the alias menu command <b>runtest</b> will start the spCoinEnvSetup.sh</b> application.
 - - - -
### Video Tutorial<img src="https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/video.png" width="5%" align= "right">
- Comprehensive Video Tutorial Currently Under Construction. Resource will be posted as soon as it is ready for publication.

<b>[![ToDo](https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/maxresdefault.jpg)]</b>(https://youtu.be/T_d5-y8hpYI "<b>spCoinSimpleSwapTest</b> ~ A brief overview")

### About the Authors
![<b>Author Image</b>](https://github.com/sponsorCoinAdmin/spCoinImages/blob/main/RobinPhoto.jpg)
- Name: Robert Lanson
- Position Lead Architect/CEO
- Email: <b>sponsorcoin@yahoo.com</b>

[<b>Back To The Top</b>](#directory-of-information)
