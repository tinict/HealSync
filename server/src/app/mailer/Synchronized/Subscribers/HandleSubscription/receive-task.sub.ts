import Butler from "../../../Services/butler.service";

export default async function BulterReceiveTaskHandelSubcription(message: any, channel: any) {

    console.log("Channel", channel);
    console.log("Message", message);

    try {
        console.log('Create result', message);
        Butler.collectQuests(JSON.parse(message));
        console.log(Butler.planning());
    } catch (error) {
        console.error('Failed to create application', error);
    }
};