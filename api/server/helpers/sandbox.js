import { VM } from 'vm2'
import Promise from 'bluebird'
import debug from 'debug'

/**
 * Tests code against a single test case
 * @param {String} execName - function name to run
 * @param {Object} test - { arguments: Array, result: Any }
 * @returns { success: Boolean, result: Any, test: test }
 */
export default function sandboxTest(code, execName, test) {
  return new Promise((resolve) => {
    const vm = new VM({
      timeout: 1000
    })
    const args = test.arguments.map(JSON.stringify).join(',')

    try {
      const result = vm.run(`${code} ${execName}(${args})`)
      resolve({
        success: result === test.result,
        arguments: test.arguments,
        result
      })
    } catch (e) {
      debug('Trying to test invalid code')
      resolve({
        success: false,
        arguments: test.arguments,
        result: 'Compilation error'
      })
    }
  })
}
