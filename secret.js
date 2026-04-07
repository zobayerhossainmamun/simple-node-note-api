import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient();

let cached;

export const getSecret = async () => {
    if (cached) return cached;

    const res = await client.send(
        new GetSecretValueCommand({ SecretId: "notes-db-secret" })
    );

    cached = JSON.parse(res.SecretString);
    return cached;
};