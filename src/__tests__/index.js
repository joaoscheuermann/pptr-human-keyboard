const puppeteer = require('puppeteer')

const { createKeyboard } = require('..')

describe('ghost-keyboard', () => {
  jest.setTimeout(10000)

  test('should correctly type the text', async () => {
    // Puppeteer configuration
    const browserGithubActionsConfig = {
      headless: true,
      args: [
        `--no-sandbox`,
        `--disable-setuid-sandbox`,
      ],
    }

    const browserLocalConfig = {
      headless: false
    }

    const browserConfig = process.env.GITHUB_RUN_ID ? browserGithubActionsConfig : browserLocalConfig

    const browser = await puppeteer.launch(browserConfig)

    const page = await browser.newPage()


    // Tests
    await page.setContent('<input type="text" />')

    const input = await page.$('input')
    await input.click()

    const text = 'Lorem ipsum'
    const keyboad = createKeyboard(page)

    await keyboad.type(text)

    // const typedText = await page.evaluate(() => document.querySelector('input').value)
    const typedText = await (await input.getProperty('value')).jsonValue()

    expect(typedText).toBe(text)

    await browser.close()
  })
})
