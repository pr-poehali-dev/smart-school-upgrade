import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

const subjects = [
  { id: 'math', name: 'Математика', icon: 'Calculator', topics: ['Алгебра', 'Геометрия', 'Тригонометрия'] },
  { id: 'physics', name: 'Физика', icon: 'Atom', topics: ['Механика', 'Оптика', 'Электричество'] },
  { id: 'chemistry', name: 'Химия', icon: 'Flask', topics: ['Органика', 'Неорганика', 'Реакции'] },
  { id: 'biology', name: 'Биология', icon: 'Dna', topics: ['Ботаника', 'Зоология', 'Анатомия'] },
  { id: 'history', name: 'История', icon: 'BookOpen', topics: ['Древний мир', 'Средние века', 'Новое время'] },
  { id: 'literature', name: 'Литература', icon: 'BookMarked', topics: ['Проза', 'Поэзия', 'Драматургия'] },
  { id: 'geography', name: 'География', icon: 'Globe', topics: ['Физическая', 'Экономическая', 'Социальная'] },
  { id: 'english', name: 'Английский', icon: 'Languages', topics: ['Грамматика', 'Лексика', 'Разговорный'] },
];

const gdzSources = [
  { name: 'ГДЗ.ру', url: 'https://gdz.ru', icon: 'BookOpen' },
  { name: 'Решеба.ру', url: 'https://resheba.me', icon: 'FileCheck' },
  { name: 'ГДЗ Путина', url: 'https://gdzputina.ru', icon: 'BookText' },
  { name: 'Спиши.ру', url: 'https://spishy.ru', icon: 'BookCopy' },
];

const classes = [
  { id: 5, name: '5 класс' },
  { id: 6, name: '6 класс' },
  { id: 7, name: '7 класс' },
  { id: 8, name: '8 класс' },
  { id: 9, name: '9 класс' },
  { id: 10, name: '10 класс' },
  { id: 11, name: '11 класс' },
];

export default function Index() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Привет! 👋 Я помогу тебе с домашним заданием. Выбери предмет и класс, или задай вопрос напрямую!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setChatMessages([...chatMessages, 
      { role: 'user', text: inputMessage },
      { role: 'ai', text: '📚 Отлично! Сейчас найду решение этой задачи. Обычно такие задания решаются так: сначала выписываем исходные данные, затем применяем нужную формулу...' }
    ]);
    setInputMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <header className="border-b bg-white/90 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shadow-lg">
                <Icon name="GraduationCap" size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                  MegaSchoolChat
                </h1>
                <p className="text-xs text-muted-foreground">AI помощник с учебниками</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="hover:bg-green-100">
                <Icon name="Bell" size={18} />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-green-100">
                <Icon name="Settings" size={18} />
              </Button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-bold shadow-lg">
                У
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 bg-clip-text text-transparent">
            Учёба стала проще 🎓
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Умная нейросеть изучила ВСЕ учебники и решебники. Получи помощь с домашкой за секунды!
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all">
              <Icon name="Sparkles" size={20} className="mr-2" />
              Решить задачу
            </Button>
            <Button size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Icon name="BookOpen" size={20} className="mr-2" />
              Найти ГДЗ
            </Button>
            <Button size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Icon name="Play" size={20} className="mr-2" />
              Видео-уроки
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-3 items-center text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Icon name="Check" size={16} className="text-green-600" />
              5-11 классы
            </span>
            <span className="flex items-center gap-2">
              <Icon name="Check" size={16} className="text-green-600" />
              Все предметы
            </span>
            <span className="flex items-center gap-2">
              <Icon name="Check" size={16} className="text-green-600" />
              Пошаговые решения
            </span>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-bold flex items-center gap-3">
              <Icon name="BookOpen" size={32} className="text-green-600" />
              Выбери предмет
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {subjects.map((subject, index) => (
              <Card 
                key={subject.id}
                className={`p-6 cursor-pointer transition-all hover:scale-105 hover:shadow-xl border-2 ${
                  selectedSubject === subject.id 
                    ? 'border-green-600 bg-green-50' 
                    : 'border-transparent hover:border-green-300'
                } animate-scale-in`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedSubject(subject.id)}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <Icon name={subject.icon as any} size={32} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{subject.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{subject.topics.length} разделов</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Icon name="Users" size={28} className="text-green-600" />
            Выбери класс
          </h3>
          <div className="flex flex-wrap gap-3">
            {classes.map((cls) => (
              <Button
                key={cls.id}
                variant={selectedClass === cls.id ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedClass(cls.id)}
                className={selectedClass === cls.id 
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md" 
                  : "border-green-600 text-green-700 hover:bg-green-50"
                }
              >
                {cls.name}
              </Button>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-xl border-2 border-green-100">
              <Tabs defaultValue="chat">
                <TabsList className="grid w-full grid-cols-3 mb-6 bg-green-50">
                  <TabsTrigger value="chat" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    <Icon name="MessageCircle" size={18} className="mr-2" />
                    Чат с AI
                  </TabsTrigger>
                  <TabsTrigger value="gdz" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    <Icon name="BookOpen" size={18} className="mr-2" />
                    ГДЗ
                  </TabsTrigger>
                  <TabsTrigger value="topics" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    <Icon name="Library" size={18} className="mr-2" />
                    Темы
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="chat">
                  <div className="space-y-4">
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Icon name="Lightbulb" size={24} className="text-green-600 mt-1" />
                        <div>
                          <h4 className="font-bold text-green-900 mb-2">Как работает AI помощник?</h4>
                          <p className="text-sm text-green-700">
                            Задавай вопросы по любому предмету — AI объяснит тему простым языком, покажет примеры и решит задачи пошагово!
                          </p>
                        </div>
                      </div>
                    </div>

                    <ScrollArea className="h-[400px] border-2 border-green-100 rounded-xl p-4">
                      <div className="space-y-4">
                        {chatMessages.map((msg, index) => (
                          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                            <div className={`max-w-[80%] p-4 rounded-2xl shadow-md ${
                              msg.role === 'user' 
                                ? 'bg-gradient-to-br from-green-600 to-emerald-600 text-white' 
                                : 'bg-white border-2 border-green-100'
                            }`}>
                              <p className="text-sm leading-relaxed">{msg.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    <div className="flex gap-2">
                      <Input 
                        placeholder="Напиши вопрос или отправь задачу..." 
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 border-2 border-green-200 focus:border-green-600"
                      />
                      <Button 
                        onClick={handleSendMessage}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-md"
                        size="lg"
                      >
                        <Icon name="Send" size={20} />
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="gdz">
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold mb-4">Доступные источники ГДЗ</h4>
                    {gdzSources.map((source) => (
                      <Card key={source.name} className="p-4 hover:shadow-lg transition-all border-2 border-green-100 hover:border-green-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                              <Icon name={source.icon as any} size={24} className="text-white" />
                            </div>
                            <div>
                              <h5 className="font-bold text-lg">{source.name}</h5>
                              <p className="text-sm text-muted-foreground">{source.url}</p>
                            </div>
                          </div>
                          <Button 
                            onClick={() => window.open(source.url, '_blank')}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                          >
                            <Icon name="ExternalLink" size={16} className="mr-2" />
                            Открыть
                          </Button>
                        </div>
                      </Card>
                    ))}
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mt-6">
                      <p className="text-sm text-green-700 flex items-start gap-2">
                        <Icon name="Info" size={18} className="mt-0.5 flex-shrink-0" />
                        <span>AI помощник интегрирован со всеми популярными решебниками и найдёт ответ на твой вопрос автоматически!</span>
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="topics">
                  {selectedSubject ? (
                    <div className="space-y-4">
                      <h4 className="text-xl font-bold mb-4">
                        {subjects.find(s => s.id === selectedSubject)?.name} - Разделы
                      </h4>
                      {subjects.find(s => s.id === selectedSubject)?.topics.map((topic, index) => (
                        <Card key={index} className="p-4 hover:shadow-lg transition-all border-2 border-green-100 hover:border-green-300">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                <span className="font-bold text-green-700">{index + 1}</span>
                              </div>
                              <h5 className="font-semibold">{topic}</h5>
                            </div>
                            <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                              <Icon name="Play" size={16} className="mr-2" />
                              Изучить
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="BookOpen" size={48} className="text-green-300 mx-auto mb-4" />
                      <p className="text-muted-foreground">Выбери предмет, чтобы увидеть доступные темы</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div>
            <Card className="p-6 shadow-xl border-2 border-green-100 mb-6">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="TrendingUp" size={20} className="text-green-600" />
                Твой прогресс
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Решено задач</span>
                    <span className="font-bold text-green-700">24 из 50</span>
                  </div>
                  <div className="h-3 bg-green-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-600 to-emerald-600 w-[48%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Изучено тем</span>
                    <span className="font-bold text-green-700">12 из 30</span>
                  </div>
                  <div className="h-3 bg-green-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-600 to-emerald-600 w-[40%]" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-xl border-2 border-green-100">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="Award" size={20} className="text-green-600" />
                Достижения
              </h4>
              <div className="space-y-3">
                {[
                  { icon: 'Star', title: 'Первые шаги', desc: 'Решил первую задачу' },
                  { icon: 'Flame', title: 'В ударе!', desc: '5 дней подряд' },
                  { icon: 'Target', title: 'Отличник', desc: '10 задач без ошибок' }
                ].map((achievement, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                      <Icon name={achievement.icon as any} size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <section className="mb-12">
          <Card className="p-8 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white border-0 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Почему выбирают нас? 🚀</h3>
                <p className="text-green-50 max-w-2xl mx-auto">
                  Самая умная нейросеть, которая изучила все учебники и решебники школьной программы
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center animate-float">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <Icon name="Brain" size={36} />
                  </div>
                  <h4 className="font-bold text-xl mb-2">Умный AI</h4>
                  <p className="text-sm text-green-50">Понимает контекст и объясняет пошагово</p>
                </div>
                <div className="text-center animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <Icon name="Zap" size={36} />
                  </div>
                  <h4 className="font-bold text-xl mb-2">Быстро</h4>
                  <p className="text-sm text-green-50">Ответ за секунды, не нужно искать в интернете</p>
                </div>
                <div className="text-center animate-float" style={{ animationDelay: '1s' }}>
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <Icon name="Shield" size={36} />
                  </div>
                  <h4 className="font-bold text-xl mb-2">Надёжно</h4>
                  <p className="text-sm text-green-50">Проверенные решения из официальных источников</p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-white/90 backdrop-blur-lg py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                <Icon name="GraduationCap" size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                MegaSchoolChat
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              © 2024 MegaSchoolChat. Умный помощник для учёбы
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-green-600 transition-colors flex items-center gap-1">
              <Icon name="MessageCircle" size={16} />
              Поддержка
            </a>
            <a href="#" className="text-muted-foreground hover:text-green-600 transition-colors flex items-center gap-1">
              <Icon name="Mail" size={16} />
              Контакты
            </a>
            <a href="#" className="text-muted-foreground hover:text-green-600 transition-colors flex items-center gap-1">
              <Icon name="Info" size={16} />
              О платформе
            </a>
            <a href="#" className="text-muted-foreground hover:text-green-600 transition-colors flex items-center gap-1">
              <Icon name="FileText" size={16} />
              Правила
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
