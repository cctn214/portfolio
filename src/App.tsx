import { useState } from 'react';
import { LayoutContainer } from './components/LayoutContainer';
import { GlassFrame } from './components/GlassFrame';
import { HomeTab } from './components/HomeTab';
import { EducationTab } from './components/EducationTab';
import { ProjectsTab } from './components/ProjectsTab';
import { ContactTab } from './components/ContactTab';

function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab setActiveTab={setActiveTab} />;
      case 'education':
        return <EducationTab />;
      case 'projects':
        return <ProjectsTab />;
      case 'contact':
        return <ContactTab />;
      default:
        return <HomeTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <LayoutContainer>
      <GlassFrame activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderActiveTab()}
      </GlassFrame>
    </LayoutContainer>
  );
}

export default App;
