import { describe, expect, it } from "bun:test";

describe('main', () => {
    it('should return 200', () => { 
        return fetch('http://localhost:3000/').then(res => {
            expect(res.status).toBe(200);
        });
    });
})