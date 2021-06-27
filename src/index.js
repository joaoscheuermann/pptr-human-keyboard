const sleep = async delay => new Promise(resolve => setTimeout(resolve, delay || 1000))

const random = (minimum, maximum) => Math.floor(Math.random() * (maximum - minimum + 1)) + minimum

exports.createKeyboard = page => {
  const keyboard = [
    ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'],
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
    ['a', 's', 'd', 'f','g', 'h', 'j', 'k', 'l', ';', '\''],
    ['z', 'x', 'c', 'v','b', 'n', 'm', ',', '.', '/'],
  ]

  const findCharPositionOnKeyboard = char => {
    for(const y in keyboard) {
      for (const x in keyboard[y]) {
        if (keyboard[y][x] === char.toLowerCase())
          return {
            x: parseInt(x),
            y: parseInt(y)
          }
      }
    }
  }

  const findCharNeightborsChars = char => {
    const result = findCharPositionOnKeyboard(char)

    if (!result)
      return []

    const { x, y } = result

    const getCharAt = (x, y) => {
      try {
        return keyboard[y][x]
      } catch {
        return undefined
      }
    }

    const chars = [
      getCharAt(x - 1, y),
      getCharAt(x - 1, y - 1),
      getCharAt(x, y - 1),
      getCharAt(x + 1, y - 1),
      getCharAt(x + 1, y),
      getCharAt(x + 1, y + 1),
      getCharAt(x, y + 1),
      getCharAt(x - 1, y + 1),
    ]

    return chars.filter(char => char)
  }

  return {
    type: async (text, canMissWhenTyping = true) => {
      const chars = text.split('')

      for (const char of chars) {
        const miss = random(0, 100) > 90
        const chars = findCharNeightborsChars(char)

        if (canMissWhenTyping && miss && chars.length) {
          const _char = chars[random(0, chars.length - 1)]

          await page.keyboard.type(_char, {
            delay: random(1, 5) * 25
          })

          await sleep(random(1, 5) * 50)

          await page.keyboard.press('Backspace', {
            delay: random(1, 10) * 25
          })

          await sleep(random(5, 5) * 25)
        }

        await page.keyboard.type(char, {
          delay: random(1, 5) * 30
        })
      }
    }
  }
}
