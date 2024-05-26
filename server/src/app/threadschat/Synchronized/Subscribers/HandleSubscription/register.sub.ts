// import { ApplicationMapper } from "../../../Models";
// import AppServiceProvider from "../../../Providers/AppServiceProvider";
// import { ApplicationService } from "../../../Services";

// export default async function RegisterHandelSubcription(message: any, channel: any) {
//     console.log('RegisterHandelSubcription called');

//     const applicationService = AppServiceProvider.getContainer().resolve(ApplicationService);

//     // console.log("Channel", channel);
//     console.log("Message", JSON.parse(message));

//     try {
//         const application = ApplicationMapper.toApplication(JSON.parse(message));
//         const result = await applicationService.create(application);
//         console.log('Create result', result);
//     } catch (error) {
//         console.error('Failed to create application', error);
//     }
// };
