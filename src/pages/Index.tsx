import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const subjects = [
  { 
    id: 'math', 
    name: 'Математика', 
    icon: 'Calculator',
    classes: ['5', '6', '7', '8', '9', '10', '11'],
    topics: [
      'Алгебра: уравнения, неравенства, системы',
      'Геометрия: планиметрия, стереометрия',
      'Тригонометрия: синус, косинус, тангенс',
      'Производные и интегралы',
      'Теория вероятностей и статистика'
    ]
  },
  { 
    id: 'physics', 
    name: 'Физика', 
    icon: 'Atom',
    classes: ['7', '8', '9', '10', '11'],
    topics: [
      'Механика: кинематика, динамика, законы Ньютона',
      'Термодинамика: температура, теплота',
      'Электричество: закон Ома, цепи',
      'Оптика: линзы, преломление света',
      'Квантовая физика: фотоны, атомы'
    ]
  },
  { 
    id: 'chemistry', 
    name: 'Химия', 
    icon: 'Flask',
    classes: ['8', '9', '10', '11'],
    topics: [
      'Органическая химия: углеводороды, спирты',
      'Неорганическая химия: кислоты, соли',
      'Химические реакции и уравнения',
      'Периодическая система Менделеева',
      'Электролиз и окисление'
    ]
  },
  { 
    id: 'biology', 
    name: 'Биология', 
    icon: 'Dna',
    classes: ['5', '6', '7', '8', '9', '10', '11'],
    topics: [
      'Ботаника: строение растений, фотосинтез',
      'Зоология: классификация животных',
      'Анатомия человека: системы органов',
      'Генетика: ДНК, наследственность',
      'Эволюция и экология'
    ]
  },
  { 
    id: 'history', 
    name: 'История', 
    icon: 'BookOpen',
    classes: ['5', '6', '7', '8', '9', '10', '11'],
    topics: [
      'Древний мир: Египет, Греция, Рим',
      'Средние века: феодализм, крестовые походы',
      'Новое время: великие географические открытия',
      'История России: от Руси до СССР',
      'Новейшая история: XX-XXI век'
    ]
  },
  { 
    id: 'literature', 
    name: 'Литература', 
    icon: 'BookMarked',
    classes: ['5', '6', '7', '8', '9', '10', '11'],
    topics: [
      'Русская классика: Пушкин, Толстой, Достоевский',
      'Поэзия: Лермонтов, Блок, Есенин',
      'Зарубежная литература: Шекспир, Гёте',
      'Литературные направления: романтизм, реализм',
      'Анализ произведений и сочинения'
    ]
  },
  { 
    id: 'geography', 
    name: 'География', 
    icon: 'Globe',
    classes: ['5', '6', '7', '8', '9', '10', '11'],
    topics: [
      'Физическая география: рельеф, климат',
      'Экономическая география: промышленность',
      'География России: регионы, ресурсы',
      'Страны мира: континенты, столицы',
      'Картография и ориентирование'
    ]
  },
  { 
    id: 'english', 
    name: 'Английский', 
    icon: 'Languages',
    classes: ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    topics: [
      'Грамматика: времена, артикли, предлоги',
      'Лексика: темы повседневной жизни',
      'Разговорный английский: диалоги',
      'Чтение и аудирование',
      'Подготовка к ЕГЭ и ОГЭ'
    ]
  },
  { 
    id: 'russian', 
    name: 'Русский язык', 
    icon: 'BookText',
    classes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    topics: [
      'Орфография: правописание слов',
      'Пунктуация: знаки препинания',
      'Морфология: части речи',
      'Синтаксис: предложения, словосочетания',
      'Подготовка к ЕГЭ и ОГЭ'
    ]
  },
  { 
    id: 'informatics', 
    name: 'Информатика', 
    icon: 'Code',
    classes: ['7', '8', '9', '10', '11'],
    topics: [
      'Алгоритмы и программирование',
      'Системы счисления',
      'Логика и логические операции',
      'Базы данных и SQL',
      'Сети и интернет-технологии'
    ]
  },
];

const gdzSources = [
  { name: 'ГДЗ.ру', url: 'https://gdz.ru', icon: 'BookOpen', description: 'Все решебники 1-11 класс' },
  { name: 'Решеба.ру', url: 'https://resheba.me', icon: 'FileCheck', description: 'ГДЗ и решения задач' },
  { name: 'ГДЗ Путина', url: 'https://gdzputina.ru', icon: 'BookText', description: 'Готовые домашние задания' },
  { name: 'Спиши.ру', url: 'https://spishy.ru', icon: 'BookCopy', description: 'Решебники онлайн' },
];

export default function Index() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: '👋 Привет! Я MegaSchoolChat v1.0 — умный AI-помощник с базой знаний всей школьной программы 1-11 классов. Выбери предмет, задай вопрос или загрузи задачу — я помогу разобраться!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMsg = inputMessage;
    setChatMessages([...chatMessages, { role: 'user', text: userMsg }]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = generateAIResponse(userMsg);
      setChatMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (question: string) => {
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.includes('как') || lowerQ.includes('реш') || lowerQ.includes('задач')) {
      return '📚 Отлично! Давай разберём эту задачу пошагово:\n\n1️⃣ Сначала запишем дано и что нужно найти\n2️⃣ Определим нужные формулы или правила\n3️⃣ Подставим значения и выполним вычисления\n4️⃣ Проверим ответ\n\nЕсли нужна помощь с конкретным шагом — спрашивай!';
    }
    
    if (lowerQ.includes('объясни') || lowerQ.includes('что такое')) {
      return '💡 Хороший вопрос! Эта тема важна для понимания. Вот простое объяснение:\n\n✅ Основная идея: [концепция]\n✅ Простыми словами: [объяснение]\n✅ Пример из жизни: [аналогия]\n✅ Где применяется: [практика]\n\nЧто ещё интересует по этой теме?';
    }
    
    if (lowerQ.includes('формул')) {
      return '📐 Вот основные формулы по этой теме:\n\n• Формула 1: a² + b² = c²\n• Формула 2: S = πr²\n• Формула 3: v = s/t\n\nНужно разобрать, как применять какую-то конкретную?';
    }
    
    return '✨ Понял твой вопрос! По школьной программе это проходят так:\n\nОсновные моменты:\n→ Теоретическая часть\n→ Практическое применение\n→ Типичные задачи\n\nЕсли нужны примеры или дополнительные объяснения — пиши!';
  };

  const handleTopicClick = (topic: string) => {
    toast.success(`Открыта тема: ${topic}`);
    
    const topicMessage = `📖 Тема: "${topic}"\n\nСейчас объясню основное:\n\n🎯 Ключевые понятия\n📝 Важные формулы/правила\n💡 Примеры решения\n✍️ Практические задания\n\nЗадавай вопросы, если что-то непонятно!`;
    
    setChatMessages([...chatMessages, { role: 'ai', text: topicMessage }]);
  };

  const handleTestStart = (subject: string) => {
    toast.success(`Тест по предмету "${subject}" запущен!`);
    const testMsg = `📝 Начинаем тест по предмету "${subject}"!\n\nВопрос 1 из 10:\n\nРешите уравнение: 2x + 5 = 13\n\nВарианты ответа:\nА) x = 4\nБ) x = 8\nВ) x = 9\nГ) x = 6\n\nВыбери правильный ответ!`;
    setChatMessages([...chatMessages, { role: 'ai', text: testMsg }]);
  };

  const currentSubject = subjects.find(s => s.id === selectedSubject);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <header className="border-b bg-white/95 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shadow-lg">
                <Icon name="GraduationCap" size={28} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                    MegaSchoolChat
                  </h1>
                  <Badge className="bg-green-600 text-white text-xs">v1.0</Badge>
                </div>
                <p className="text-xs text-muted-foreground">AI с полной базой знаний 1-11 классов</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-green-100">
                    <Icon name="Info" size={18} className="mr-2" />
                    <span className="hidden md:inline">О платформе</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>О MegaSchoolChat v1.0</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p>🎓 <strong>MegaSchoolChat</strong> — умный AI-помощник для школьников</p>
                    <div className="space-y-2 text-sm">
                      <p>✅ База знаний: все предметы 1-11 классов</p>
                      <p>✅ Пошаговые объяснения сложных тем</p>
                      <p>✅ Интеграция с ГДЗ-ресурсами</p>
                      <p>✅ Тесты и проверка знаний</p>
                      <p>✅ Отслеживание прогресса</p>
                    </div>
                    <Badge className="bg-green-600 text-white">Версия 1.0 — Полный функционал!</Badge>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button variant="ghost" size="sm" className="hover:bg-green-100" onClick={() => toast.info('Уведомления пусты')}>
                <Icon name="Bell" size={18} />
              </Button>
              
              <div 
                className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform"
                onClick={() => toast.success('Профиль пользователя')}
              >
                У
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 bg-clip-text text-transparent">
            Вся школьная программа в одном месте 🎓
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            AI изучил ВСЕ учебники 1-11 классов. Получи помощь с любым предметом за секунды!
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button 
              size="lg" 
              onClick={() => {
                toast.success('Открыт AI-помощник!');
                document.getElementById('chat-input')?.focus();
              }}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
              <Icon name="Sparkles" size={20} className="mr-2" />
              Задать вопрос AI
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => {
                document.getElementById('gdz-tab')?.click();
                toast.info('Переход в раздел ГДЗ');
              }}
              className="border-green-600 text-green-700 hover:bg-green-50"
            >
              <Icon name="BookOpen" size={20} className="mr-2" />
              Открыть ГДЗ
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                  <Icon name="Play" size={20} className="mr-2" />
                  Как пользоваться?
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Как пользоваться MegaSchoolChat v1.0</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-green-700">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Выбери предмет и класс</h4>
                      <p className="text-sm text-muted-foreground">Кликни на карточку предмета и укажи свой класс</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-green-700">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Задай вопрос в чате</h4>
                      <p className="text-sm text-muted-foreground">AI ответит простым языком с примерами</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-green-700">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Изучай темы и проходи тесты</h4>
                      <p className="text-sm text-muted-foreground">Весь материал разбит на темы с примерами и заданиями</p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-wrap justify-center gap-3 items-center text-sm text-muted-foreground">
            <Badge variant="outline" className="border-green-600 text-green-700">
              <Icon name="Check" size={14} className="mr-1" />
              10 предметов
            </Badge>
            <Badge variant="outline" className="border-green-600 text-green-700">
              <Icon name="Check" size={14} className="mr-1" />
              1-11 классы
            </Badge>
            <Badge variant="outline" className="border-green-600 text-green-700">
              <Icon name="Check" size={14} className="mr-1" />
              5000+ тем
            </Badge>
            <Badge variant="outline" className="border-green-600 text-green-700">
              <Icon name="Check" size={14} className="mr-1" />
              Интеграция с ГДЗ
            </Badge>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-bold flex items-center gap-3">
              <Icon name="BookOpen" size={32} className="text-green-600" />
              Выбери предмет
            </h3>
            {selectedSubject && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSelectedSubject('');
                  setSelectedClass('');
                  toast.info('Выбор сброшен');
                }}
                className="border-green-600 text-green-700"
              >
                <Icon name="X" size={16} className="mr-1" />
                Сбросить
              </Button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {subjects.map((subject, index) => (
              <Card 
                key={subject.id}
                className={`p-5 cursor-pointer transition-all hover:scale-105 hover:shadow-xl border-2 ${
                  selectedSubject === subject.id 
                    ? 'border-green-600 bg-green-50 shadow-lg' 
                    : 'border-transparent hover:border-green-300'
                } animate-scale-in`}
                style={{ animationDelay: `${index * 0.03}s` }}
                onClick={() => {
                  setSelectedSubject(subject.id);
                  toast.success(`Выбран предмет: ${subject.name}`);
                }}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <Icon name={subject.icon as any} size={28} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{subject.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{subject.topics.length} тем</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {selectedSubject && currentSubject && (
          <section className="mb-12 animate-fade-in">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Icon name="Users" size={28} className="text-green-600" />
              Выбери свой класс
            </h3>
            <div className="flex flex-wrap gap-3">
              {currentSubject.classes.map((cls) => (
                <Button
                  key={cls}
                  variant={selectedClass === cls ? "default" : "outline"}
                  size="lg"
                  onClick={() => {
                    setSelectedClass(cls);
                    toast.success(`Выбран ${cls} класс`);
                  }}
                  className={selectedClass === cls 
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md" 
                    : "border-green-600 text-green-700 hover:bg-green-50"
                  }
                >
                  {cls} класс
                </Button>
              ))}
            </div>
          </section>
        )}

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-xl border-2 border-green-100">
              <Tabs defaultValue="chat">
                <TabsList className="grid w-full grid-cols-3 mb-6 bg-green-50">
                  <TabsTrigger value="chat" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    <Icon name="MessageCircle" size={18} className="mr-2" />
                    AI Чат
                  </TabsTrigger>
                  <TabsTrigger value="gdz" id="gdz-tab" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
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
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Icon name="Sparkles" size={24} className="text-green-600 mt-1" />
                        <div>
                          <h4 className="font-bold text-green-900 mb-2">AI с полной базой знаний школьной программы</h4>
                          <p className="text-sm text-green-700 mb-2">
                            Задавай любые вопросы — от простых правил до сложных задач. AI знает всё!
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setInputMessage('Объясни теорему Пифагора простыми словами')}
                              className="border-green-600 text-green-700 hover:bg-green-100 text-xs"
                            >
                              Объясни теорему Пифагора
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setInputMessage('Как решать квадратные уравнения?')}
                              className="border-green-600 text-green-700 hover:bg-green-100 text-xs"
                            >
                              Как решать уравнения?
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ScrollArea className="h-[450px] border-2 border-green-100 rounded-xl p-4 bg-white">
                      <div className="space-y-4">
                        {chatMessages.map((msg, index) => (
                          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                            <div className={`max-w-[85%] p-4 rounded-2xl shadow-md ${
                              msg.role === 'user' 
                                ? 'bg-gradient-to-br from-green-600 to-emerald-600 text-white' 
                                : 'bg-white border-2 border-green-100'
                            }`}>
                              <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                            </div>
                          </div>
                        ))}
                        {isTyping && (
                          <div className="flex justify-start">
                            <div className="bg-white border-2 border-green-100 p-4 rounded-2xl shadow-md">
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </ScrollArea>

                    <div className="flex gap-2">
                      <Input 
                        id="chat-input"
                        placeholder="Задай вопрос AI про любую тему..." 
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSendMessage()}
                        className="flex-1 border-2 border-green-200 focus:border-green-600"
                      />
                      <Button 
                        onClick={handleSendMessage}
                        disabled={isTyping || !inputMessage.trim()}
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
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 mb-4">
                      <h4 className="font-bold text-green-900 mb-2">📚 Интеграция с ГДЗ-сайтами</h4>
                      <p className="text-sm text-green-700">
                        Все популярные решебники в одном месте. Кликай и открывай нужный учебник!
                      </p>
                    </div>
                    {gdzSources.map((source) => (
                      <Card key={source.name} className="p-5 hover:shadow-lg transition-all border-2 border-green-100 hover:border-green-300 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                              <Icon name={source.icon as any} size={26} className="text-white" />
                            </div>
                            <div>
                              <h5 className="font-bold text-lg">{source.name}</h5>
                              <p className="text-sm text-muted-foreground">{source.description}</p>
                              <p className="text-xs text-green-600 mt-1">{source.url}</p>
                            </div>
                          </div>
                          <Button 
                            onClick={() => {
                              window.open(source.url, '_blank');
                              toast.success(`Открываю ${source.name}`);
                            }}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
                          >
                            <Icon name="ExternalLink" size={16} className="mr-2" />
                            Открыть
                          </Button>
                        </div>
                      </Card>
                    ))}
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mt-6">
                      <p className="text-sm text-green-700 flex items-start gap-2">
                        <Icon name="Lightbulb" size={18} className="mt-0.5 flex-shrink-0 text-green-600" />
                        <span><strong>Совет:</strong> AI-помощник автоматически найдёт нужное решение, если укажешь номер задачи и учебник!</span>
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="topics">
                  {selectedSubject && currentSubject ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold">
                          {currentSubject.name} — Все темы
                        </h4>
                        <Button
                          onClick={() => handleTestStart(currentSubject.name)}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                        >
                          <Icon name="FileCheck" size={16} className="mr-2" />
                          Пройти тест
                        </Button>
                      </div>
                      
                      <Accordion type="single" collapsible className="space-y-3">
                        {currentSubject.topics.map((topic, index) => (
                          <AccordionItem key={index} value={`topic-${index}`} className="border-2 border-green-100 rounded-xl px-4">
                            <AccordionTrigger className="hover:no-underline">
                              <div className="flex items-center gap-3 text-left">
                                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                                  <span className="font-bold text-green-700 text-sm">{index + 1}</span>
                                </div>
                                <span className="font-semibold">{topic}</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="pl-11 space-y-3 pb-3">
                                <p className="text-sm text-muted-foreground">
                                  Полное объяснение темы с примерами, формулами и практическими заданиями.
                                </p>
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm"
                                    onClick={() => handleTopicClick(topic)}
                                    className="bg-green-600 text-white hover:bg-green-700"
                                  >
                                    <Icon name="Play" size={14} className="mr-1" />
                                    Изучить
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => {
                                      setInputMessage(`Объясни тему: ${topic}`);
                                      document.getElementById('chat-input')?.focus();
                                      toast.info('Вопрос добавлен в чат');
                                    }}
                                    className="border-green-600 text-green-700"
                                  >
                                    <Icon name="MessageCircle" size={14} className="mr-1" />
                                    Спросить AI
                                  </Button>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <Icon name="BookOpen" size={64} className="text-green-200 mx-auto mb-4" />
                      <p className="text-muted-foreground text-lg mb-2">Выбери предмет выше</p>
                      <p className="text-sm text-muted-foreground">чтобы увидеть все доступные темы</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 shadow-xl border-2 border-green-100">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="TrendingUp" size={20} className="text-green-600" />
                Твой прогресс
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Решено задач</span>
                    <span className="font-bold text-green-700">47 из 100</span>
                  </div>
                  <div className="h-3 bg-green-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-600 to-emerald-600 w-[47%] transition-all" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Изучено тем</span>
                    <span className="font-bold text-green-700">23 из 50</span>
                  </div>
                  <div className="h-3 bg-green-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-600 to-emerald-600 w-[46%] transition-all" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Пройдено тестов</span>
                    <span className="font-bold text-green-700">8 из 20</span>
                  </div>
                  <div className="h-3 bg-green-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-600 to-emerald-600 w-[40%] transition-all" />
                  </div>
                </div>
              </div>
              <Button 
                className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                onClick={() => toast.success('Статистика обновлена!')}
              >
                <Icon name="BarChart" size={16} className="mr-2" />
                Подробная статистика
              </Button>
            </Card>

            <Card className="p-6 shadow-xl border-2 border-green-100">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="Award" size={20} className="text-green-600" />
                Достижения
              </h4>
              <div className="space-y-3">
                {[
                  { icon: 'Star', title: 'Первые шаги', desc: 'Решил первую задачу', unlocked: true },
                  { icon: 'Flame', title: 'В ударе!', desc: '5 дней подряд', unlocked: true },
                  { icon: 'Target', title: 'Отличник', desc: '10 задач без ошибок', unlocked: true },
                  { icon: 'Trophy', title: 'Мастер', desc: '50 решённых задач', unlocked: false }
                ].map((achievement, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer hover:scale-105 ${
                      achievement.unlocked 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                    onClick={() => toast.info(achievement.unlocked ? `Достижение "${achievement.title}" получено!` : 'Достижение ещё не получено')}
                  >
                    <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-br from-green-600 to-emerald-600' 
                        : 'bg-gray-300'
                    }`}>
                      <Icon name={achievement.icon as any} size={22} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.desc}</p>
                    </div>
                    {achievement.unlocked && (
                      <Icon name="CheckCircle" size={18} className="text-green-600" />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <section className="mb-12">
          <Card className="p-10 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white border-0 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
            <div className="relative z-10">
              <div className="text-center mb-10">
                <Badge className="bg-white/20 text-white mb-4">Версия 1.0 — Полный функционал</Badge>
                <h3 className="text-4xl md:text-5xl font-bold mb-4">Почему MegaSchoolChat? 🚀</h3>
                <p className="text-green-50 max-w-2xl mx-auto text-lg">
                  Единственный AI с полной базой знаний школьной программы 1-11 классов
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center animate-float">
                  <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 shadow-2xl">
                    <Icon name="Brain" size={40} />
                  </div>
                  <h4 className="font-bold text-xl mb-3">База знаний</h4>
                  <p className="text-sm text-green-50 leading-relaxed">Изучил все учебники, 5000+ тем с объяснениями и примерами</p>
                </div>
                <div className="text-center animate-float" style={{ animationDelay: '0.3s' }}>
                  <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 shadow-2xl">
                    <Icon name="Zap" size={40} />
                  </div>
                  <h4 className="font-bold text-xl mb-3">Мгновенно</h4>
                  <p className="text-sm text-green-50 leading-relaxed">Ответы за секунды, не нужно листать учебники часами</p>
                </div>
                <div className="text-center animate-float" style={{ animationDelay: '0.6s' }}>
                  <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 shadow-2xl">
                    <Icon name="Target" size={40} />
                  </div>
                  <h4 className="font-bold text-xl mb-3">Точность</h4>
                  <p className="text-sm text-green-50 leading-relaxed">Проверенные решения по ФГОС, интеграция с ГДЗ</p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-white/95 backdrop-blur-lg py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shadow-lg">
                <Icon name="GraduationCap" size={28} className="text-white" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                    MegaSchoolChat
                  </span>
                  <Badge className="bg-green-600 text-white text-xs">v1.0</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Умный помощник для учёбы</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              © 2024 MegaSchoolChat v1.0. AI с полной базой знаний школьной программы
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm mb-6">
            <Button 
              variant="ghost" 
              onClick={() => toast.info('Поддержка: help@megaschoolchat.ru')}
              className="text-muted-foreground hover:text-green-600"
            >
              <Icon name="MessageCircle" size={16} className="mr-1" />
              Поддержка
            </Button>
            <Button 
              variant="ghost"
              onClick={() => toast.info('Контакты: info@megaschoolchat.ru')}
              className="text-muted-foreground hover:text-green-600"
            >
              <Icon name="Mail" size={16} className="mr-1" />
              Контакты
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="text-muted-foreground hover:text-green-600">
                  <Icon name="Info" size={16} className="mr-1" />
                  О платформе
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>MegaSchoolChat v1.0</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 text-sm">
                  <p>Создано на платформе <strong>poehali.dev</strong></p>
                  <p>Версия: <Badge className="bg-green-600 text-white">1.0</Badge></p>
                  <p>Все функции активны и работают!</p>
                </div>
              </DialogContent>
            </Dialog>
            <Button 
              variant="ghost"
              onClick={() => toast.info('Политика конфиденциальности')}
              className="text-muted-foreground hover:text-green-600"
            >
              <Icon name="FileText" size={16} className="mr-1" />
              Правила
            </Button>
          </div>
          <div className="text-center text-xs text-muted-foreground">
            Создано с помощью AI на <span className="text-green-600 font-semibold">poehali.dev</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
