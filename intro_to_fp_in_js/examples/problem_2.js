var tracker = {};

function trackRepair(expenseTracker, roomName, amount) {
  expenseTracker[roomName] = (expenseTracker[roomName] || 0) + amount;
}

function totalRepairCostIn(expenseTracker, roomName) {
  return expenseTracker[roomName] || 0;
}

trackRepair(tracker, 'man-cave', 1000);
trackRepair(tracker, 'man-cave', 50);
trackRepair(tracker, 'living-room', 20);

console.log(totalRepairCostIn(tracker, 'man-cave')); // => 1050
console.log(totalRepairCostIn(tracker, 'living-room')); // => 20
console.log(totalRepairCostIn(tracker, 'bathroom')); // => 0
