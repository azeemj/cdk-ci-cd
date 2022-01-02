// import * as cdk from "@aws-cdk/core";
// import {
// 	CodeBuildStep,
// 	CodePipeline,
// 	CodePipelineSource
// } from "@aws-cdk/pipelines";

// export class MyPipelineStack extends cdk.Stack {
// 	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
// 		super(scope, id, props);

// 		const pipeline = new Pipeline(this, "BlogPipeline", {
// 			pipelineName: "BlogPipeline",
// 			synth: new CodeBuildStep("SynthStep", {
// 				input: CodePipelineSource.connection(
// 					"<Repo owner>/<Repo name>",
// 					"main",
// 					{
// 						connectionArn:
// 							"ARN OF THE CODESTAR CONNECTION MADE EARLIER"
// 					}
// 				),
// 				installCommands: ["npm install -g aws-cdk"],
// 				commands: ["npm ci", "npm run build", "npx cdk synth"]
// 			})
// 		});

// 	}
// }