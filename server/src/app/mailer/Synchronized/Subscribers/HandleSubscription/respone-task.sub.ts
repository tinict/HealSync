import Butler from "../../../Services/butler.service";

export default async function ResponeTaskHandelSubcription(message: any, channel: any) {
    console.log("Channel", channel);
    console.log("Message", JSON.parse(message));

    try {
        console.log('Create result', JSON.parse(message));
        Butler.coordinator(JSON.parse(message));
    } catch (error) {
        console.error('Failed to create application', error);
    }
};