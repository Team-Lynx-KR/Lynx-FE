import { designTokens } from '../../design/tokens';
import Landing from './Landing';

const Onboarding = () => {
  // Unused functions removed for build

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: designTokens.colors.dark[900] }}
    >
      {/* Main Content - Scrollable */}
      <main className="flex-1 w-full overflow-y-auto">
        <Landing />
      </main>
    </div>
  );
};

export default Onboarding;
