const core = require('@actions/core')
const github = require('@actions/github')

;(async () => {
    try {
        const version = process.env.GITHUB_ACTION_REF
            ? `\u001b[35;1m${process.env.GITHUB_ACTION_REF}`
            : 'Local'
        core.info(`🏳️ Starting Test Action 1 - ${version}`)

        // Debug
        core.startGroup('Debug: github.context')
        console.log(github.context)
        core.endGroup() // Debug github.context
        core.startGroup('Debug: process.env')
        console.log(process.env)
        core.endGroup() // Debug process.env

        // Inputs
        core.startGroup('Inputs')
        // const token = core.getInput('token', { required: true })
        // core.info(`token: ${token}`)
        // const multi = core.getMultilineInput('multi')
        // console.log('\u001b[31;1m  multi:\u001b[0m', multi)
        // const csv = getMultiCsv('multi', true)
        // console.log('\u001b[32;1m  csv:\u001b[0m', csv)
        core.endGroup()

        // // Action
        // core.startGroup('Action')
        // const result = token
        // console.log('result:', result)
        // core.endGroup()

        // Outputs
        // core.setOutput('results', result)

        // // Job Summary
        // core.info('📝 Writing Job Summary')

        core.info(`✅ \u001b[32;1mFinished Success`)
    } catch (e) {
        core.debug(e)
        core.info(e.message)
        core.setFailed(e.message)
    }
})()

/**
 * Get Multiline Input or CSV
 * @param {String} name
 * @param {Boolean} required
 * @param {Boolean} trimWhitespace
 * @return {String[]}
 */
function getMultiCsv(name, required = false, trimWhitespace = true) {
    let input = core.getMultilineInput(name, { required, trimWhitespace })
    if (input.length === 1 && input[0].includes(',')) {
        input = input[0].split(',')
    }
    if (trimWhitespace) {
        input = input.map((item) => item.trim())
    }
    input = input.filter((i) => {
        return i
    })
    if (!input.length && required) {
        throw new Error(`Missing Required Input: ${name}`)
    }
    return input
}
