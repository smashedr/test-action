const path = require('node:path')

const core = require('@actions/core')
const exec = require('@actions/exec')
// const github = require('@actions/github')

async function main() {
    const version = process.env.GITHUB_ACTION_REF
        ? `\u001b[35;1m${process.env.GITHUB_ACTION_REF}`
        : 'Source'
    core.info(`🏳️ Starting Test Action 1 - ${version}`)

    // // Debug
    // core.startGroup('Debug: github.context')
    // console.log(github.context)
    // core.endGroup() // Debug github.context
    // core.startGroup('Debug: process.env')
    // console.log(process.env)
    // core.endGroup() // Debug process.env

    // Inputs
    core.startGroup('Inputs')
    const token = core.getInput('token', { required: true })
    core.info(`token: ${token}`)
    const multi = core.getMultilineInput('multi')
    console.log('multi:', multi)
    core.endGroup()

    // Path
    console.log('__dirname:', __dirname)
    console.log('__filename:', __filename)
    const actionPath = path.resolve(__dirname, '..')
    console.log('actionPath:', actionPath)
    const srcPath = path.join(actionPath, 'src')
    console.log('srcPath:', srcPath)
    await exec.exec('ls', ['-lah', srcPath], { ignoreReturnCode: true })
    console.log('----------------------')

    // core.startGroup('Actions')
    // const options = { ignoreReturnCode: true }
    // // await exec.exec('tree', ['/home/runner/work/_actions/'], options)
    // await exec.exec('ls', ['-lah', '/home/runner/work/_actions/'], options)
    // console.log('GITHUB_ACTION_REPOSITORY:', process.env.GITHUB_ACTION_REPOSITORY)
    // console.log('GITHUB_ACTION_REF:', process.env.GITHUB_ACTION_REF)
    // const actionPath = `/home/runner/work/_actions/${process.env.GITHUB_ACTION_REPOSITORY}/${process.env.GITHUB_ACTION_REF}`
    // console.log('actionPath:', actionPath)
    // await exec.exec('ls', ['-lah', actionPath], options)
    // core.endGroup() // Debug process.env

    // Action
    core.startGroup('Action')
    const results = multi
    console.log('results:', results)
    core.endGroup()

    await wait()

    // Outputs
    core.setOutput('results', results)

    core.info(`✅ \u001b[32;1mFinished Success`)
}

async function wait(timeout = 1000 * 8) {
    core.info(`setTimeout: ${timeout}`)
    await new Promise((resolve) => setTimeout(resolve, timeout))
    core.info('setTimeout: done')
}

// main()
// await main()

main().catch((e) => {
    core.debug(e)
    core.info(e.message)
    core.setFailed(e.message)
})

// try {
//     await main()
// } catch (e) {
//     core.debug(e)
//     core.info(e.message)
//     core.setFailed(e.message)
// }
