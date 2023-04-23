export default class TapService {
  constructor(pourRepository, tapRepository, kegRepository) {
    this.pourRepository = pourRepository;
    this.tapRepository = tapRepository;
    this.kegRepository = kegRepository;
  }

  attachKegToTap = (tapIdentity, kegIdentity) => {
    const tap = this.tapRepository.findByIdentity(tapIdentity);
    const keg = this.kegRepository.findByIdentity(kegIdentity);
    
  };

  getTapStatus = (tapIdentity) => {
    const tap = this.tapRepository.findByIdentity(tapIdentity);
    const keg = this.kegRepository.findByIdentity(tap.getCurrentKegIdentity());
    return {
      tapIdentity,
      tapStatus: tap.getStatus(),
      kegLevel: keg ? keg.getLevel() : null,
    };
  };

  recordPour = (tapIdentity, pourObject) => {
    const tap = this.tapRepository.findByIdentity(tapIdentity);
    const pour = this.pourRepository.createPourFromObject(pourObject);
  };
}
