import path from 'node:path'
import { fileURLToPath } from 'node:url'

import * as core from '@actions/core'
import * as exec from '@actions/exec'
// import * as github from '@actions/github'

async function main() {
    try {
        const version = process.env.GITHUB_ACTION_REF
            ? `\u001b[35;1m${process.env.GITHUB_ACTION_REF}`
            : 'Local'
        core.info(`🏳️ Starting Test Action - ${version}`)

        // // Debug
        // core.startGroup('Debug: github.context')
        // console.log(github.context)
        // core.endGroup() // Debug github.context
        // core.startGroup('Debug: process.env')
        // console.log(process.env)
        // core.endGroup() // Debug process.env

        // Inputs
        core.startGroup('Inputs')
        const inputs = {
            token: core.getInput('token', { required: true }),
            multi: core.getMultilineInput('multi'),
        }
        console.log(inputs)
        core.endGroup() // Inputs

        // Setup
        const __filename = fileURLToPath(import.meta.url)
        console.log(`__filename: ${__filename}`)
        const __dirname = path.dirname(__filename)
        console.log(`__dirname: ${__dirname}`)
        const src = path.resolve(__dirname, '../src')
        console.log(`src: ${src}`)
        await exec.exec('ls', ['-lah', src], { ignoreReturnCode: true })

        // Action
        core.startGroup('Action')
        const results = inputs.multi
        console.log('results:', results)
        core.endGroup()

        // Outputs
        core.setOutput('results', results)

        core.info(`✅ \u001b[32;1mFinished Success`)
    } catch (e) {
        core.debug(e)
        core.info(e.message)
        core.setFailed(e.message)
    }
}

await main()
