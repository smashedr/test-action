const core = require('@actions/core')
// const github = require('@actions/github')

;(async () => {
    try {
        // Debug
        // console.log('github.context:', github.context)
        // console.log('process.env:', process.env)
        core.startGroup('Debug')
        console.log('GITHUB_WORKFLOW_REF:', process.env.GITHUB_WORKFLOW_REF)
        core.endGroup()

        // Inputs
        core.startGroup('Inputs')
        const token = core.getInput('token', { required: true })
        core.info(`token: ${token}`)
        core.endGroup()

        // Action
        core.startGroup('Action')
        const result = token
        console.log('result:', result)
        core.endGroup()

        // Outputs
        core.setOutput('results', result)

        core.info(`✅ \u001b[32;1mFinished Success`)
    } catch (e) {
        core.debug(e)
        core.info(e.message)
        core.setFailed(e.message)
    }
})()
