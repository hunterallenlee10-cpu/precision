import { BuildStages } from "../BuildStages/BuildStages";
import { Tape } from "../Tape";

export function HowWeBuild() {
  return (
    <section id="how-we-build" aria-labelledby="build-title" className="section">
      <div className="wrap">
        <div className="mb-12 max-w-[760px] lg:mb-16">
          <Tape>How we build</Tape>
          <h2 id="build-title" className="display mt-6 text-[40px] sm:text-[56px] lg:text-[72px]">
            Tape. Frame. Finish.
          </h2>
          <p className="mt-4 text-[19px] text-muted">One real job, start to end.</p>
        </div>
        <BuildStages />
      </div>
    </section>
  );
}
