# **MinecraftModSync**

Are you irritated of prompts every-now-and-then that ask you to update XYZ mod when you launch minecraft??
<br>
<b>Oh yeah, me too.</b>
<br>
So I wrote this simple node program that does the job for you. It will download the latest mods in one click.

##

Easily download the latest mods from <b>Modrinth & CurseForge</b> for specified game version and loader (in my case, fabric).<br/>

## **New Features and Updates (v-2.2.0)**

- Now supports separate collection IDs for client and server mods in Modrinth.

- Automatically downloads mods into separate folders for client and server environments.

### Key Notes:

- You need to manually create new collection and assign server mods to that collection.
- Client collection can still be auto updated with `npm run update` based on followed projects
- Defaults to the client collection ID for scripts unless otherwise specified.

### Changes to ModsConfig.json file

- #### `modrinthCollectionId` now accepts separate collection id for client and server mods

  ```json
  "modrinthCollectionId": {
    "client": "<insert Client-side mods collection ID>",
    "server": "<insert Server-side mods collection ID>"
  }
  ```

### Technical Changes

- `npm run check` now lists the mods sorted alphabetically.
- Refactored code to use async await wherever possible.
- Separated the download file logic into its own dedicated module to improve code organization.

<br/>

## **New Features and Updates (v-2.1.0)**

### Support for **Modrinth Collections** is finally here

- **Say goodbye to manual list updates!**

### With Modrinth adding collections ( & making life easier),

- you only need to maintain the public collection from where you want to download the mods.
- no hassle of manually updating the mods list in config file.

<br/>

### Changes to ModsConfig.json file

- #### Addition of two new fields

  ```json
  "modrinthUserId": "<instert your user id here>",
  "modrinthCollectionId": "<insert (public) collection id here>",
  ```

- #### Note:
  - After adding <b>userId & CollectionId rename</b> `ModsConfig_example.json` to `ModsConfig.json`

<br/>

### Added NPM scripts

- #### So you feel you're a wizard when you:

  `npm run download`

  ```
  hope you guessed it, it downloads the mods

  - if public collection defined in config && collection valid
      - downloads the mods in the public collection
  - else
      - if user id defined in config && valid api key in .env
          - downloads the mods in the followed projects

  rest all cases, may the node be with you
  ```

  `npm run check`

  ```
  - Lists down the available and not available mods for the game version defined in ModsConfig

  - Some mods might take quite some time to get updated to latest version of MC

      - helpful if you just want to "check" which mods are available & not available when a new version is dropped eg 1.20.5, 1.21 etc
  ```

- #### You feel its a chore adding the followed projects (private) to the public collection

  `npm run update`

  ```
  [requires api key]
  updates your public collection from your followed projects (private collection)
  ```

- #### You feel like the modern way isn't for you and you want to live the old life:

  `npm run list`

  ```
  - it lists down the mods in the same format as requied in config file so you can download mods via legacy way
  ```

  `npm run legacy`

  ```
  - for backwards compatibility
  ```

<br/>

## Usage

1. <b>ModsConfig.json</b> is the configuration file:
   <ul><li>It defines game version, loader and list of mods.</li>
   <li><b>Mod_Name</b> is just a place holder and can be named anything you want.</li>
   <li><b>Project_ID</b> must be correct. Visit Modrinth to get the project id of the mod.</li></ul><br>
    
    ```
    Add more mods as required. Do not forget to add "," after every "}" when adding a new mods to list.
    Use below json structure
    {
        "Mod_Name": <name>,
        "Project_ID": <id>
    }
    ```

   Here is the sample attached - Seprate list maintained for modrinth and Curseforge mods.

   ```json
   {
     "gameVersion": "1.20.1",
     "loader": "fabric",
     "modsList_Modrinth": [
       {
         "Mod_Name": "Fabric API",
         "Project_ID": "P7dR8mSH"
       },
       {
         "Mod_Name": "Sodium",
         "Project_ID": "AANobbMI"
       },
       {
         "Mod_Name": "Lithium",
         "Project_ID": "gvQqBUqZ"
       }
     ],
     "modsList_CurseForge": [
       {
         "Mod_Name": "Litematica",
         "Project_ID": "308892"
       }
     ]
   }
   ```

   <br>

2. Create a .env file to define your API KEYS.

- CurseForge and Modrinth required API KEY.
- Modrinth requires api key only for followed mods- if you have public collection, feel free to skip

  ```
  CF_API_KEY=<api-key>
  MODRINTH_API_KEY=<api-key>
  ```

3. Run the tool with the configuration file as an argument:

   ```
   npm run <script_name>
   ```

   <br>

4. The tool will download the latest mod <s>specified in the <b>ModsConfig.json</b>.</s> directly from your modrinth collection / followed mods.
   <br>
   <br>

## No longer need to define manually

<del>

## Why it needs to be defined Manually?

Ahhh.. coz I am Lazy & didn't want to implement a complex mod manager like system.<br>
This is for those who use only a specifc set of mods and don't need to change it often.<br>
In this case it becomes very easy to manually keep track of required mods.

## Wondering how lazy am I? Uhmm... this Lazy

</del>

### Still Lazy enough to not implement:

- **Other loaders for curseforge**

  - Curseforge is kinda dead now, majority have moved to modrinth

    ```js
    let loaderType = loader === "fabric" ? 4 : 1;
    ```

- **Limited Error Handling**
  - to avoid over complications in code
  - avoid crazy development time
  - This is supposed to be a simple quick hack program for downloading mods in 1 command

<br/>

## For the nerds out you there

get follows response from network tab for modrinth followed mods
Then use below code to get the array list to avoid manually configuring the list

```javascript
res = follows
  .filter(o => o.project_type === "mod")
  .map(({ id, slug }) => ({ Mod_Name: slug, Project_ID: id }));
```

<br>Image for Reference <br><br>

![](https://i.ibb.co/vVDfpQx/Follows-Modrinth.jpg)

## Contributions

Suggestions / Contributions are welcome! Feel free to open issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the <b>MIT<b>

## Acknowledgments

- This project utilizes the Modrinth & CurseForge API to retrieve mod information and download links.
