# Using SquadWatch

## How do I try out SquadWatch with Expo?

#### Step 1: Installing Expo

Follow steps 1 and 2 from the following link to install the Expo CLI and client app: https://docs.expo.io/get-started/installation/

#### Step 2: Downloading and running SquadWatch

Clone our git repository with the url as prompted by bitbucket. The clone line you put in terminal will be of the following form:

```git clone https://user@bitbucket.org/cs3701/squadwatch.git```

Once you have the repository stored in a local directory, open a terminal window and ```cd``` to this directory.   
Run the following command:

```npm ci```  
(This command cleans the directory of any extraneous imports and installs all needed react native packages)  

Place the ```.env``` file in the top level directory of the local copy, i.e. resulting in the path ```/squadwatch/.env```  

In the terminal, run the command ```expo start```. This will start a 'metro bundler' on a local port, and a GUI interface will open in a browser for you to run the app in different forms.  

* To open the app in an Android emulator, click on "Run on Android device/emulator".  

* To open the app in an iOS simulator, click on "Run on iOS simulator".  

* To open the app on your phone using the Expo client app, scan the QR code in the bottom left with your phone camera.