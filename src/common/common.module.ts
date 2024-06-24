import { Module } from '@nestjs/common';
import { AxiosAdpter } from './adapters/axios.adapter';

@Module({
    providers: [ AxiosAdpter ],
    exports: [ AxiosAdpter ]
})
export class CommonModule {}
