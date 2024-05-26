import { injectable } from "inversify";
import {
    IntegrationEntity,
    IntegrationEntity as IntegrationRepository
} from '../Entities';

@injectable()
export class IntegrationService {
    async createIntegration(model: IntegrationEntity) {
        try {
            return await IntegrationRepository.save(model);
        } catch (error) {
            throw error;
        }
    };

    async getIntergration(integration_id: number) {
        try {
            return await IntegrationRepository.findOne({ where: { integration_id } });
        } catch (error) {
            throw error;
        }
    };

    async getAllIntergration() {
        try {
            return await IntegrationRepository.find();
        } catch (error) {
            throw error;
        }
    };

    async updateIntergration(integration_id: number, updatedIntergration: Partial<IntegrationEntity>) {
        try {
            let IntergrationToUpdate = await IntegrationRepository.findOne({ where: { integration_id } });
            if (IntergrationToUpdate) {
                Object.assign(IntergrationToUpdate, updatedIntergration);
                return await IntegrationRepository.save(IntergrationToUpdate);
            }
            return null;
        } catch (error) {
            throw error;
        }
    };

    async deleteIntergration(integration_id: number) {
        try {
            let intergrationToDelete = await IntegrationRepository.findOne({ where: { integration_id } });
            if (intergrationToDelete) {
                return await IntegrationRepository.remove(intergrationToDelete);
            }
            return null;
        } catch (error) {
            throw error;
        }
    };
};