import AngleUtil from '@/util/Angle';

describe('AngleUtil', () => {
  it('is defined', () => {
    expect(AngleUtil).to.not.be.an('undefined');
  });

  it('has the correct functions', () => {
    expect(AngleUtil.calcAngle).to.be.a('function');
    expect(AngleUtil.angle360).to.be.a('function');
    expect(AngleUtil.makeZeroDegreesAtNorth).to.be.a('function');
    expect(AngleUtil.makeClockwise).to.be.a('function');
  });

  describe('functions', () => {
    const p1 = [0, 0];
    const p2 = [0, 1];

    it('calcAngle returns correct value', () => {
      expect(AngleUtil.calcAngle(p1, p2)).to.equal(-90);
    });

    it('angle360 returns correct value', () => {
      expect(AngleUtil.angle360(p1, p2)).to.equal(270);
    });

    it('makeZeroDegreesAtNorth returns correct value', () => {
      const angle360 = AngleUtil.angle360(p1, p2);

      expect(AngleUtil.makeZeroDegreesAtNorth(angle360)).to.equal(360);
    });

    it('makeClockwise returns correct value', () => {
      const angle360 = AngleUtil.angle360(p1, p2);

      expect(AngleUtil.makeClockwise(angle360)).to.equal(90);
    });
  });
});
