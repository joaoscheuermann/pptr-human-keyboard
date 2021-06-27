# pptr-human-keyboard

This library helps emulating the human typing behavior on Puppeteer.

## Instalation

``` npm install pptr-human-keyboard ````

## Usage
```js
// You should have Puppeteer installed
const puppeteer = require('puppeteer')

// Imports the module
const { createKeyboard } = require('pptr-human-keyboard')

const init = async () => {
  // Initializes Puppeteer
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // Initialize the library
  const keyboard = createKeyboard(page)

  // do some stuff ...

  await keyboard.type('Lorem Ipsum') // Unleash the magic

  await browser.close()
}

init()
```
