const core = require('@actions/core')
// const github = require('@actions/github')

;(async () => {
    try {
        // Debug
        // console.log('github.context:', github.context)
        // console.log('process.env:', process.env)
        core.startGroup('Debug')
        console.log('process.env:', process.env)
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

        // Job Summary
        core.info('📝 Writing Job Summary')
        core.summary.addRaw('## Test Action\n')
        core.summary.addRaw('I did it!\n')

        // $GITHUB_SERVER_URL/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID
        core.summary.addRaw(
            `\n\n<small><a href="${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}/job/${process.env.GITHUB_RUN_ID}">` +
                `View Logs</a></small>\n\n`
        )

        const text = 'View Documentation, Report Issues or Request Features'
        const link = 'https://github.com/smashedr/test-action'
        core.summary.addRaw(
            `\n[${text}](${link}?tab=readme-ov-file#readme)\n\n---`
        )
        await core.summary.write()

        core.info(`✅ \u001b[32;1mFinished Success`)
    } catch (e) {
        core.debug(e)
        core.info(e.message)
        core.setFailed(e.message)
    }
})()
