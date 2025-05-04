async function getEventData(
    contract,
    txReceipt,
    eventName
) {
    if (txReceipt?.logs) {
        for (const log of txReceipt.logs) {
            const event = contract.interface.parseLog(log);
            if (event?.name === eventName) {
                return event;
            }
        }
    }

    return null;
}