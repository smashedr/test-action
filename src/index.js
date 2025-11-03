const core = require('@actions/core')
const exec = require('@actions/exec')
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
        const token = core.getInput('token', { required: true })
        core.info(`token: ${token}`)
        const multi = core.getMultilineInput('multi')
        console.log('multi:', multi)
        core.endGroup()

        // // Action
        // core.startGroup('Action')
        // const result = token
        // console.log('result:', result)
        // core.endGroup()

        // Outputs
        core.setOutput('results', 'INOP')

        core.info(`✅ \u001b[32;1mFinished Success`)
    } catch (e) {
        core.debug(e)
        core.info(e.message)
        core.setFailed(e.message)
    }
})()
