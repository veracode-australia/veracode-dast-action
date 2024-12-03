import * as core from '@actions/core';
import { parseInputs } from './inputs';
// import * as fs from 'fs';
import * as exec from '@actions/exec';
import { Octokit } from '@octokit/rest';
// import * as policyService from './services/policy-service';
// import * as pipelineResultsService from './services/pipeline-results-service';
// import * as policyResultsService from './services/policy-results-services';
// import * as applicationService from './services/application-service';

/**
 * Runs the action.
 */
export async function run(): Promise<void> {
  const inputs = parseInputs(core.getInput);
  console.log('Inputs:', inputs);
  await exec.exec('ls', ['-l']);
  const token = core.getInput('token');
  const owner = core.getInput('owner');
  const repo = core.getInput('repo');

  try {
    const dast_input_file_name = inputs.dast_config_file_name;
    const octokit = new Octokit({ auth: `token ${token}` });
    // read the file from the source code repo
    const response = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: dast_input_file_name
    });
    core.info(`File content: ${response.data}`);
    // const fileContent = Buffer.from(response.data, 'base64').toString('utf8');
    // core.info(`File content: ${fileContent}`);
  } catch (error) {
    core.setFailed('File not found');
  }
  

  // switch (inputs.action) {
  //   case 'getPolicyNameByProfileName':
  //     await policyService.getPolicyNameByProfileName(inputs);
  //     break;
  //   case 'preparePipelineResults':
  //     await pipelineResultsService.preparePipelineResults(inputs);
  //     break;
  //   case 'preparePolicyResults':
  //     await policyResultsService.preparePolicyResults(inputs);
  //     break;
  //   case 'removeSandbox':
  //     await applicationService.removeSandbox(inputs);
  //     break;
  //   case 'validateVeracodeApiCreds':
  //     await applicationService.validateVeracodeApiCreds(inputs);
  //     break;
  //   case 'validatePolicyName':
  //     await applicationService.validatePolicyName(inputs);
  //     break;
  //   case 'registerBuild':
  //     await applicationService.registerBuild(inputs);
  //     break;
  //   default:
  //     core.setFailed(
  //       `Invalid action: ${inputs.action}. Allowed actions are: getPolicyNameByProfileName, preparePipelineResults, preparePolicyResults, removeSandbox, validateVeracodeApiCreds, validatePolicyName, registerBuild.`,
  //     );
  // }
}
