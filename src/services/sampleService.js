import { prisma } from '../utils/prismaInstance.js'

class SampleService{
    createSample = async (sampleBody) => {
        // 비즈니스 로직 및 데이터베이스와 상호작용하는 코드를 작성합니다.
        return await prisma.sample.create({
            data: sampleBody
        })
    };
}

export default new SampleService();