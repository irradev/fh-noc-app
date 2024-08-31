import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";


describe('check.service.ts', () => {
    
    const mockRepsitory = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(
        mockRepsitory,
        successCallback,
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call successCallback when fetch returns true', async () => {

        const wasOk = await checkService.execute('http://localhost:3000');
        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockRepsitory.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });

    test('should call errorCallback when fetch false', async () => {

        const wasOk = await checkService.execute('https://localhost:3000');
        expect(wasOk).toBe(false);
        expect(errorCallback).toHaveBeenCalled();
        expect(successCallback).not.toHaveBeenCalled();

        expect(mockRepsitory.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });

});