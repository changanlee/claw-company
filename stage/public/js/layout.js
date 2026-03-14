// Zone coordinates, slot positions, depth constants — pure data, no Phaser dependency
// All coordinates are for a 1920x1080 canvas

const LAYOUT = {
  canvas: { width: 1920, height: 1080 },

  depth: {
    background: 0,
    furniture: 100,
    characters: 200,
    effects: 300,
    ui: 400
  },

  zones: {
    'chairman-office': {
      position: { x: 960, y: 160 },
      size: { w: 600, h: 260 },
      maxSlots: 1,
      slots: [{ x: 0, y: 20, type: 'main' }],
      furniture: ['big-desk', 'monitor-wall', 'bookshelf']
    },
    'cfo-zone': {
      position: { x: 240, y: 460 },
      size: { w: 300, h: 220 },
      maxSlots: 4,
      slots: [
        { x: 0, y: 0, type: 'main' },
        { x: 80, y: 60, type: 'sub' },
        { x: -80, y: 60, type: 'sub' },
        { x: 0, y: 110, type: 'sub' }
      ],
      furniture: ['desk', 'chair']
    },
    'cio-zone': {
      position: { x: 560, y: 460 },
      size: { w: 300, h: 220 },
      maxSlots: 4,
      slots: [
        { x: 0, y: 0, type: 'main' },
        { x: 80, y: 60, type: 'sub' },
        { x: -80, y: 60, type: 'sub' },
        { x: 0, y: 110, type: 'sub' }
      ],
      furniture: ['desk', 'chair']
    },
    'ceo-zone': {
      position: { x: 880, y: 460 },
      size: { w: 300, h: 220 },
      maxSlots: 4,
      slots: [
        { x: 0, y: 0, type: 'main' },
        { x: 80, y: 60, type: 'sub' },
        { x: -80, y: 60, type: 'sub' },
        { x: 0, y: 110, type: 'sub' }
      ],
      furniture: ['desk', 'chair', 'phone']
    },
    'cto-zone': {
      position: { x: 1200, y: 460 },
      size: { w: 300, h: 220 },
      maxSlots: 4,
      slots: [
        { x: 0, y: 0, type: 'main' },
        { x: 80, y: 60, type: 'sub' },
        { x: -80, y: 60, type: 'sub' },
        { x: 0, y: 110, type: 'sub' }
      ],
      furniture: ['desk', 'chair']
    },
    'chro-zone': {
      position: { x: 1560, y: 460 },
      size: { w: 300, h: 220 },
      maxSlots: 4,
      slots: [
        { x: 0, y: 0, type: 'main' },
        { x: 80, y: 60, type: 'sub' },
        { x: -80, y: 60, type: 'sub' },
        { x: 0, y: 110, type: 'sub' }
      ],
      furniture: ['desk', 'chair']
    },
    'coo-zone': {
      position: { x: 400, y: 720 },
      size: { w: 380, h: 220 },
      maxSlots: 4,
      slots: [
        { x: 0, y: 0, type: 'main' },
        { x: 100, y: 60, type: 'sub' },
        { x: -100, y: 60, type: 'sub' },
        { x: 0, y: 110, type: 'sub' }
      ],
      furniture: ['desk', 'chair']
    },
    'cao-zone': {
      position: { x: 1400, y: 720 },
      size: { w: 380, h: 220 },
      maxSlots: 4,
      slots: [
        { x: 0, y: 0, type: 'main' },
        { x: 100, y: 60, type: 'sub' },
        { x: -100, y: 60, type: 'sub' },
        { x: 0, y: 110, type: 'sub' }
      ],
      furniture: ['desk', 'chair']
    },
    'break-room': {
      position: { x: 960, y: 980 },
      size: { w: 600, h: 140 },
      maxSlots: 8,
      slots: [
        { x: -200, y: 0, type: 'seat' },
        { x: -120, y: 0, type: 'seat' },
        { x: -40, y: 0, type: 'seat' },
        { x: 40, y: 0, type: 'seat' },
        { x: 120, y: 0, type: 'seat' },
        { x: 200, y: 0, type: 'seat' },
        { x: -80, y: 40, type: 'seat' },
        { x: 80, y: 40, type: 'seat' }
      ],
      furniture: ['sofa', 'coffee-machine', 'vending-machine']
    }
  },

  // Helper: get world position for a zone's slot
  getSlotPosition(zoneId, slotIndex) {
    const zone = this.zones[zoneId];
    if (!zone) return { x: 960, y: 540 };
    const slot = zone.slots[Math.min(slotIndex, zone.slots.length - 1)];
    return {
      x: zone.position.x + slot.x,
      y: zone.position.y + slot.y
    };
  }
};
