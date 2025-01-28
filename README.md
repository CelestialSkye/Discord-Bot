This is a bot i made for my own convenience

You need to change the api keys and use your own keys in bot.json 

# [How to install]
```
git clone https://github.com/CelestialSkye/Discord-Bot.git
npm install
node .
```

# [How to config] 
```
{
    "description_imgur": "This is Imgur API key ",
    "token": "",
    "GUILD_TEST": "guild test id",
    "IMGUR_CLIENT_ID": "your imgur client id",
    "CLIENT_SECRET": "the client secret",
    "REFRESH_TOKEN": "imgur refresh token",
    "ACCESS_TOKEN": "imgur access token",

    "description_weather": "This is Openweather API key ",
    "apiToken": "openweather api key",

    "description_MAL_API": "This is MAL api",
    "MAL_CLIENT_ID": "your mal client id"


}


```


The Discord bot connection was originally developed by devPhytols. I cloned the project to create an Imgur bot that could upload images directly through Discord. Over time, it evolved into something more. I modified the original code to support additional image formats, GIFs, and image attachments. Now, you can easily upload images by simply copying the image, selecting the image option when typing /imgur, and pasting the image you want to upload.

In addition to image uploading, I added several useful slash commands:

- An Imgur command that can automatically upload your image using a Link or an image attachment.
- A weather command to check the weather in any city.
- A purge command to delete multiple messages at once.
- An anime info command that pulls details from MyAnimeList (MAL).
- A FFXIV meme command that fetches memes from r/ShitpostXIV for no reason.


# [Credits]
This project is based on [devPhytols-Web](https://github.com/devPhytols/UpImgur-Bot-Discord) by [devPhytols](https://github.com/devPhytols).
