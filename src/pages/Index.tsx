import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

const subjects = [
  { id: 'math', name: 'Математика', icon: 'Calculator', color: 'bg-gradient-to-br from-purple-500 to-purple-700', topics: 12 },
  { id: 'physics', name: 'Физика', icon: 'Atom', color: 'bg-gradient-to-br from-blue-500 to-blue-700', topics: 10 },
  { id: 'chemistry', name: 'Химия', icon: 'Flask', color: 'bg-gradient-to-br from-green-500 to-green-700', topics: 8 },
  { id: 'biology', name: 'Биология', icon: 'Dna', color: 'bg-gradient-to-br from-emerald-500 to-emerald-700', topics: 9 },
  { id: 'history', name: 'История', icon: 'BookOpen', color: 'bg-gradient-to-br from-amber-500 to-amber-700', topics: 15 },
  { id: 'literature', name: 'Литература', icon: 'BookMarked', color: 'bg-gradient-to-br from-pink-500 to-pink-700', topics: 11 },
  { id: 'geography', name: 'География', icon: 'Globe', color: 'bg-gradient-to-br from-cyan-500 to-cyan-700', topics: 7 },
  { id: 'english', name: 'Английский', icon: 'Languages', color: 'bg-gradient-to-br from-indigo-500 to-indigo-700', topics: 13 },
];

const topics = {
  math: [
    { id: 1, name: 'Алгебра: Квадратные уравнения', difficulty: 'medium', progress: 60 },
    { id: 2, name: 'Геометрия: Теорема Пифагора', difficulty: 'easy', progress: 100 },
    { id: 3, name: 'Тригонометрия: Синус и косинус', difficulty: 'hard', progress: 30 },
  ],
  physics: [
    { id: 1, name: 'Механика: Законы Ньютона', difficulty: 'medium', progress: 45 },
    { id: 2, name: 'Оптика: Преломление света', difficulty: 'easy', progress: 80 },
    { id: 3, name: 'Электричество: Закон Ома', difficulty: 'medium', progress: 55 },
  ],
};

const tests = [
  { id: 1, name: 'Математика: Алгебра 8 класс', questions: 15, time: '20 мин', difficulty: 'medium' },
  { id: 2, name: 'Физика: Механика', questions: 20, time: '25 мин', difficulty: 'hard' },
  { id: 3, name: 'История: Великая Отечественная война', questions: 12, time: '15 мин', difficulty: 'easy' },
];

export default function Index() {
  const [selectedSubject, setSelectedSubject] = useState('math');
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Привет! Я твой AI-помощник по учёбе. Задавай любые вопросы по школьной программе!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setChatMessages([...chatMessages, 
      { role: 'user', text: inputMessage },
      { role: 'ai', text: 'Отличный вопрос! Давай разберём это подробнее. Эта тема связана с основными принципами, которые мы изучали ранее...' }
    ]);
    setInputMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="border-b bg-white/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Icon name="GraduationCap" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              MegaSchoolChat
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Icon name="Bell" size={18} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Settings" size={18} />
            </Button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center animate-slide-up">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Учись легко с AI
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Лучшая нейросеть для обучения. Объясняем сложные темы простым языком с примерами и визуализацией
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all">
              <Icon name="Sparkles" size={20} className="mr-2" />
              Начать учиться
            </Button>
            <Button size="lg" variant="outline">
              <Icon name="PlayCircle" size={20} className="mr-2" />
              Как это работает
            </Button>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Icon name="BookOpen" size={32} className="text-purple-600" />
            Предметы
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {subjects.map((subject, index) => (
              <Card 
                key={subject.id}
                className={`p-6 cursor-pointer transition-all hover:scale-105 hover:shadow-xl ${subject.color} text-white border-0 animate-scale-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedSubject(subject.id)}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Icon name={subject.icon as any} size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{subject.name}</h4>
                    <p className="text-sm opacity-90">{subject.topics} тем</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-lg">
              <Tabs defaultValue="topics">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="topics">
                    <Icon name="Library" size={18} className="mr-2" />
                    Темы
                  </TabsTrigger>
                  <TabsTrigger value="tests">
                    <Icon name="ClipboardCheck" size={18} className="mr-2" />
                    Тесты
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="topics">
                  <h4 className="text-xl font-bold mb-4">Математика - Темы для изучения</h4>
                  <div className="space-y-4">
                    {(topics[selectedSubject as keyof typeof topics] || topics.math).map((topic) => (
                      <Card key={topic.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h5 className="font-semibold mb-2">{topic.name}</h5>
                            <div className="flex items-center gap-2">
                              <Badge variant={topic.difficulty === 'easy' ? 'secondary' : topic.difficulty === 'medium' ? 'default' : 'destructive'}>
                                {topic.difficulty === 'easy' ? 'Легко' : topic.difficulty === 'medium' ? 'Средне' : 'Сложно'}
                              </Badge>
                              <span className="text-sm text-muted-foreground">Прогресс: {topic.progress}%</span>
                            </div>
                          </div>
                          <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                            <Icon name="Play" size={16} />
                          </Button>
                        </div>
                        <Progress value={topic.progress} className="h-2" />
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="tests">
                  <h4 className="text-xl font-bold mb-4">Доступные тесты</h4>
                  <div className="space-y-4">
                    {tests.map((test) => (
                      <Card key={test.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-semibold mb-2">{test.name}</h5>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Icon name="FileQuestion" size={16} />
                                {test.questions} вопросов
                              </span>
                              <span className="flex items-center gap-1">
                                <Icon name="Clock" size={16} />
                                {test.time}
                              </span>
                              <Badge variant={test.difficulty === 'easy' ? 'secondary' : test.difficulty === 'medium' ? 'default' : 'destructive'}>
                                {test.difficulty === 'easy' ? 'Легко' : test.difficulty === 'medium' ? 'Средне' : 'Сложно'}
                              </Badge>
                            </div>
                          </div>
                          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                            Начать тест
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div>
            <Card className="p-6 shadow-lg h-[600px] flex flex-col">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <Icon name="Bot" size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold">AI Помощник</h4>
                  <p className="text-xs text-muted-foreground">Всегда онлайн</p>
                </div>
              </div>

              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.role === 'user' 
                          ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Input 
                  placeholder="Задай вопрос AI..." 
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                >
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </Card>
          </div>
        </div>

        <section className="mb-12">
          <Card className="p-8 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white border-0 shadow-2xl">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4">Почему MegaSchoolChat?</h3>
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div className="animate-float">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                    <Icon name="Brain" size={32} />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Умный AI</h4>
                  <p className="text-sm opacity-90">Объясняет сложное простым языком</p>
                </div>
                <div className="animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                    <Icon name="Lightbulb" size={32} />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Интерактивно</h4>
                  <p className="text-sm opacity-90">Примеры и визуализация для каждой темы</p>
                </div>
                <div className="animate-float" style={{ animationDelay: '1s' }}>
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                    <Icon name="TrendingUp" size={32} />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Прогресс</h4>
                  <p className="text-sm opacity-90">Отслеживай свои успехи в реальном времени</p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-white/80 backdrop-blur-lg py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="mb-2">© 2024 MegaSchoolChat. Создано с помощью AI на poehali.dev</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-purple-600 transition-colors">Контакты</a>
            <a href="#" className="hover:text-purple-600 transition-colors">Поддержка</a>
            <a href="#" className="hover:text-purple-600 transition-colors">О платформе</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
