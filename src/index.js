import path from 'node:path'
import { fileURLToPath } from 'node:url'

import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as github from '@actions/github'

async function main() {
    try {
        const version = process.env.GITHUB_ACTION_REF
            ? `\u001b[35;1m${process.env.GITHUB_ACTION_REF}`
            : 'Local'
        core.info(`🏳️ Starting Test Action - ${version}`)

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

        const __filename = fileURLToPath(import.meta.url)
        console.log(`__filename: ${__filename}`)
        const __dirname = path.dirname(__filename)
        console.log(`__dirname: ${__dirname}`)
        const src = path.resolve(__dirname, '../src')
        console.log(`src: ${src}`)
        await exec.exec('ls', ['-lah', src], { ignoreReturnCode: true })

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
}

await main()
