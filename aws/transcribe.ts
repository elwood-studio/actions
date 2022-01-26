import { fromEnv } from "https://deno.land/x/aws_sdk@v3.32.0-1/credential-provider-env/mod.ts";
import { Transcribe } from "https://deno.land/x/aws_sdk@v3.32.0-1/client-transcribe/mod.ts";
import {
  S3Client,
  waitUntilObjectExists,
} from "https://deno.land/x/aws_sdk@v3.32.0-1/client-s3/mod.ts";

import { getInput } from "../core.ts";

async function main() {
  const client = new Transcribe({
    credentials: fromEnv(),
  });
  const s3 = new S3Client({
    credentials: fromEnv(),
  });

  const jobName = getInput("job_name");
  const src = getInput("src");
  const outputBucketName = getInput("output_bucket");
  const outputKey = getInput("output_key");

  const result = await client.startTranscriptionJob({
    TranscriptionJobName: jobName,
    Media: { MediaFileUri: src },
    OutputBucketName: outputBucketName,
    OutputKey: outputKey,
  });

  if (result.TranscriptionJob?.TranscriptionJobStatus !== "FAILED") {
    await waitUntilObjectExists({
      client: s3,
      maxWaitTime: 60 * 10,
    }, {
      Bucket: outputBucketName,
      Key: outputKey,
    });
  }
}

if (import.meta.main) {
  main();
}
