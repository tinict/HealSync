import { Container } from 'inversify';
import { TYPES } from '../Database/types';
import { VNPayService } from '../Services';
import { PaymentService } from '../Services/payments.service';

class AppServiceProvider {
    private container: Container;

    constructor() {
        this.container = new Container();
        this.register();
    }

    public register() {
        this.container.bind<VNPayService>(TYPES.VNPayService).to(VNPayService);
        this.container.bind<PaymentService>(TYPES.PaymentService).to(PaymentService);
    }

    public getContainer(): Container {
        return this.container;
    }
}

export default new AppServiceProvider;