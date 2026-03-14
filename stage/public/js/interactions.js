// InteractionManager — plays dispatch/approve/alert animations using Phaser tweens
class InteractionManager {
  constructor(scene, agentManager, animationDefs) {
    this.scene = scene;
    this.agentManager = agentManager;
    this.defs = animationDefs || {};
  }

  playDispatch(fromId, toId) {
    const from = this.agentManager.sprites[fromId];
    const to = this.agentManager.sprites[toId];
    if (!from || !to) return;

    const def = this.defs.dispatch || { duration: 800 };
    const startX = from.container.x;
    const startY = from.container.y - 40;
    const endX = to.container.x;
    const endY = to.container.y - 40;

    // Flying object
    const obj = this.scene.add.rectangle(startX, startY, 12, 16, 0xffffff);
    obj.setDepth(LAYOUT.depth.effects);

    this.scene.tweens.add({
      targets: obj,
      x: endX,
      y: endY,
      duration: def.duration,
      ease: 'Power2',
      onComplete: () => {
        // Flash at destination
        this.scene.tweens.add({
          targets: obj,
          alpha: 0,
          scaleX: 2,
          scaleY: 2,
          duration: 200,
          onComplete: () => obj.destroy()
        });
      }
    });
  }

  playApprove(agentId) {
    const entry = this.agentManager.sprites[agentId || 'chairman'];
    if (!entry) return;

    const def = this.defs.approve || { duration: 600 };

    // Green particles burst
    for (let i = 0; i < 8; i++) {
      const p = this.scene.add.circle(
        entry.container.x + (Math.random() - 0.5) * 40,
        entry.container.y - 50,
        3, 0x22c55e
      );
      p.setDepth(LAYOUT.depth.effects);
      this.scene.tweens.add({
        targets: p,
        y: p.y - 30 - Math.random() * 20,
        x: p.x + (Math.random() - 0.5) * 30,
        alpha: 0,
        duration: def.duration + Math.random() * 300,
        onComplete: () => p.destroy()
      });
    }
  }

  playReject() {
    const entry = this.agentManager.sprites['chairman'];
    if (!entry) return;

    // Red flash on chairman
    this.scene.tweens.add({
      targets: entry.sprite,
      alpha: { from: 1, to: 0.3 },
      yoyo: true,
      repeat: 2,
      duration: 150
    });
  }

  playAlert(agentId) {
    const entry = this.agentManager.sprites[agentId];
    if (!entry) return;

    // Red pulsing glow
    const glow = this.scene.add.circle(entry.container.x, entry.container.y - 30, 20, 0xef4444, 0.5);
    glow.setDepth(LAYOUT.depth.effects);
    this.scene.tweens.add({
      targets: glow,
      scaleX: 2,
      scaleY: 2,
      alpha: 0,
      duration: 1000,
      onComplete: () => glow.destroy()
    });
  }
}
