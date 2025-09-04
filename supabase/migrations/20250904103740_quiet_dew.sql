/*
  # Insert Sample Data

  1. Sample Categories
    - Web Development
    - JavaScript
    - TypeScript
    - React
    - Next.js

  2. Sample Blog Posts
    - Introduction post with full content
    - Technical tutorial post
    - Opinion/thought leadership piece

  3. Notes
    - All posts will be marked as published
    - Posts include realistic content and metadata
    - Categories are linked to appropriate posts
*/

-- Insert sample categories
INSERT INTO categories (id, name, slug, description) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Web Development', 'web-development', 'Modern web development techniques and best practices'),
  ('550e8400-e29b-41d4-a716-446655440002', 'JavaScript', 'javascript', 'Everything about JavaScript and ES6+ features'),
  ('550e8400-e29b-41d4-a716-446655440003', 'TypeScript', 'typescript', 'Type-safe JavaScript development'),
  ('550e8400-e29b-41d4-a716-446655440004', 'React', 'react', 'React.js library and ecosystem'),
  ('550e8400-e29b-41d4-a716-446655440005', 'Next.js', 'nextjs', 'Full-stack React framework')
ON CONFLICT (slug) DO NOTHING;

-- Create a sample user profile (you'll need to replace this with actual user ID after authentication)
-- This is just a placeholder for development
INSERT INTO profiles (id, username) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'admin')
ON CONFLICT (id) DO NOTHING;

-- Insert sample blog posts
INSERT INTO posts (id, title, slug, content, excerpt, published, author_id, reading_time, cover_image) VALUES
(
  '550e8400-e29b-41d4-a716-446655440010',
  'Welcome to DevBlog: A Modern Approach to Developer Content',
  'welcome-to-devblog',
  '# Welcome to DevBlog

Welcome to DevBlog, a carefully crafted platform designed specifically for developers who appreciate clean design and quality content. This blog represents a new approach to technical writing—one that prioritizes readability, accessibility, and user experience.

## What Makes DevBlog Different

### Clean, Scandinavian-Inspired Design
Our design philosophy draws inspiration from Scandinavian minimalism, emphasizing:
- **Readability first**: Every design decision serves the content
- **Thoughtful typography**: Poppins for headings, Lato for body text
- **Warm, inviting colors**: Terracotta accents on a warm ivory background
- **Subtle animations**: Micro-interactions that feel natural and purposeful

### Modern Technical Foundation
Built with the latest web technologies:
```typescript
// Example: Clean, modern React components
interface BlogPost {
  title: string;
  content: string;
  publishedAt: Date;
}

const PostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <article className="post-card">
      <h2>{post.title}</h2>
      <time>{post.publishedAt.toLocaleDateString()}</time>
    </article>
  );
};
```

## What You Can Expect

### In-Depth Tutorials
Step-by-step guides that respect your intelligence while providing clear, actionable instructions.

### Best Practices
Real-world insights from years of development experience, focusing on:
- Code quality and maintainability
- Performance optimization
- Team collaboration
- Modern tooling and workflows

### Thoughtful Analysis
Deep dives into technology decisions, architectural choices, and industry trends that matter to working developers.

## Join the Conversation

This platform supports interactive discussions. Sign in to:
- Leave thoughtful comments on posts
- Share your own experiences and insights
- Connect with other developers in the community

---

Thank you for visiting DevBlog. I look forward to sharing this journey with you.',
  'Welcome to DevBlog, a carefully crafted platform designed specifically for developers who appreciate clean design and quality content.',
  true,
  '550e8400-e29b-41d4-a716-446655440000',
  8,
  'https://images.pexels.com/photos/11035544/pexels-photo-11035544.jpeg'
),
(
  '550e8400-e29b-41d4-a716-446655440011',
  'Building Type-Safe APIs with TypeScript and Zod',
  'type-safe-apis-typescript-zod',
  '# Building Type-Safe APIs with TypeScript and Zod

Type safety is one of the most significant advantages of using TypeScript in modern web development. When building APIs, ensuring type safety across your entire application stack—from the frontend to the backend—can prevent countless runtime errors and improve developer experience.

## The Challenge

Traditional API development often involves:
- Manual type definitions that can drift from actual implementations
- Runtime validation that doesn''t match TypeScript types
- Error-prone data transformations between client and server

## Enter Zod: Runtime Type Validation

Zod is a TypeScript-first schema declaration and validation library that bridges the gap between compile-time and runtime type safety.

```typescript
import { z } from ''zod'';

// Define your schema
const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().int().min(0).max(120).optional(),
});

// Infer TypeScript type from schema
type User = z.infer<typeof UserSchema>;

// Validate data at runtime
const validateUser = (data: unknown): User => {
  return UserSchema.parse(data);
};
```

## Practical Implementation

### API Route Handler
```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from ''next/server'';
import { UserSchema } from ''@/lib/schemas/user'';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userData = UserSchema.parse(body);
    
    // userData is now fully type-safe!
    const user = await createUser(userData);
    
    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: ''Internal server error'' },
      { status: 500 }
    );
  }
}
```

### Frontend Integration
```typescript
// hooks/useCreateUser.ts
import { useMutation } from ''@tanstack/react-query'';
import { UserSchema, type User } from ''@/lib/schemas/user'';

export function useCreateUser() {
  return useMutation({
    mutationFn: async (userData: User) => {
      // Validate on the frontend too
      const validData = UserSchema.parse(userData);
      
      const response = await fetch(''/api/users'', {
        method: ''POST'',
        headers: { ''Content-Type'': ''application/json'' },
        body: JSON.stringify(validData),
      });

      if (!response.ok) {
        throw new Error(''Failed to create user'');
      }

      return response.json();
    },
  });
}
```

## Advanced Patterns

### Schema Composition
```typescript
const BaseUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

const CreateUserSchema = BaseUserSchema.extend({
  password: z.string().min(8),
});

const UpdateUserSchema = BaseUserSchema.partial();
```

### Transform and Refine
```typescript
const DateSchema = z.string().transform((str) => new Date(str));

const UserWithDateSchema = z.object({
  name: z.string(),
  birthDate: DateSchema,
}).refine((data) => {
  return data.birthDate < new Date();
}, {
  message: "Birth date must be in the past",
});
```

## Best Practices

1. **Define schemas close to usage**: Keep validation schemas near the code that uses them
2. **Share schemas between client and server**: Use a shared library for consistent validation
3. **Validate at boundaries**: Always validate external data (user input, API responses)
4. **Provide meaningful error messages**: Customize error messages for better UX
5. **Use progressive validation**: Start with basic validation and add refinements as needed

## Conclusion

Combining TypeScript with Zod creates a powerful foundation for building type-safe applications. You get the benefits of static type checking during development and runtime validation in production, creating more robust and maintainable code.

The investment in setting up proper schemas pays dividends in reduced bugs, better developer experience, and more confident deployments.',
  'Learn how to combine TypeScript and Zod for complete type safety across your application stack, from frontend forms to backend APIs.',
  true,
  '550e8400-e29b-41d4-a716-446655440000',
  12,
  'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg'
),
(
  '550e8400-e29b-41d4-a716-446655440012',
  'The Art of Component Composition in React',
  'component-composition-react',
  '# The Art of Component Composition in React

Component composition is one of React''s most powerful patterns, yet it''s often underutilized by developers who reach for inheritance or complex prop drilling instead. Understanding composition unlocks cleaner, more maintainable, and more flexible React applications.

## Understanding Composition vs Inheritance

React favors composition over inheritance, and for good reason:

```typescript
// ❌ Inheritance approach (avoid this)
class BaseButton extends React.Component {
  render() {
    return <button className="base-styles">{this.props.children}</button>;
  }
}

class PrimaryButton extends BaseButton {
  render() {
    return <button className="base-styles primary-styles">{this.props.children}</button>;
  }
}

// ✅ Composition approach (preferred)
interface ButtonProps {
  variant?: ''primary'' | ''secondary'';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = ''primary'', children }) => {
  return (
    <button className={`base-styles ${variant}-styles`}>
      {children}
    </button>
  );
};
```

## Practical Composition Patterns

### 1. Slot-Based Composition
```typescript
interface CardProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ header, footer, children }) => {
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      <div className="card-content">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

// Usage
<Card 
  header={<h2>User Profile</h2>}
  footer={<Button>Save Changes</Button>}
>
  <UserForm />
</Card>
```

### 2. Render Props Pattern
```typescript
interface DataFetcherProps<T> {
  url: string;
  children: (data: T | null, loading: boolean, error: string | null) => React.ReactNode;
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return <>{children(data, loading, error)}</>;
}

// Usage
<DataFetcher<User[]> url="/api/users">
  {(users, loading, error) => {
    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;
    return <UserList users={users} />;
  }}
</DataFetcher>
```

### 3. Compound Components
```typescript
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const Tabs: React.FC<{ defaultTab: string; children: React.ReactNode }> = ({ 
  defaultTab, 
  children 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

const TabList: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="tab-list">{children}</div>;
};

const Tab: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error(''Tab must be used within Tabs'');
  
  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === id;
  
  return (
    <button 
      className={`tab ${isActive ? ''active'' : ''''}`}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
};

// Usage
<Tabs defaultTab="overview">
  <TabList>
    <Tab id="overview">Overview</Tab>
    <Tab id="settings">Settings</Tab>
  </TabList>
  <TabPanel id="overview">
    <OverviewContent />
  </TabPanel>
</Tabs>
```

## Advanced Composition Techniques

### Higher-Order Components (HOCs)
```typescript
function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { user, loading } = useAuth();
    
    if (loading) return <LoadingSpinner />;
    if (!user) return <LoginPrompt />;
    
    return <Component {...props} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
```

### Custom Hooks for Logic Composition
```typescript
function useToggleableContent(initialVisible = false) {
  const [isVisible, setIsVisible] = useState(initialVisible);
  
  const toggle = useCallback(() => setIsVisible(prev => !prev), []);
  const show = useCallback(() => setIsVisible(true), []);
  const hide = useCallback(() => setIsVisible(false), []);
  
  return { isVisible, toggle, show, hide };
}

// Compose multiple hooks
function useModal() {
  const { isVisible, show, hide } = useToggleableContent();
  const { lockScroll, unlockScroll } = useScrollLock();
  
  const openModal = useCallback(() => {
    show();
    lockScroll();
  }, [show, lockScroll]);
  
  const closeModal = useCallback(() => {
    hide();
    unlockScroll();
  }, [hide, unlockScroll]);
  
  return { isOpen: isVisible, openModal, closeModal };
}
```

## Benefits of Composition

1. **Reusability**: Components can be combined in multiple ways
2. **Testability**: Smaller, focused components are easier to test
3. **Maintainability**: Changes are isolated to specific components
4. **Flexibility**: Easy to extend and modify behavior without changing existing code

## Common Pitfalls to Avoid

- **Over-composition**: Don''t create unnecessary abstraction layers
- **Prop drilling**: Use context or state management when props get unwieldy
- **Rigid interfaces**: Allow for flexibility in your component APIs

Mastering composition patterns will transform how you think about React applications, leading to more maintainable and enjoyable codebases.',
  'Explore advanced React composition patterns that lead to more maintainable and flexible applications, with practical examples and best practices.',
  true,
  '550e8400-e29b-41d4-a716-446655440000',
  10,
  'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg'
)
ON CONFLICT (slug) DO NOTHING;

-- Link posts to categories
INSERT INTO post_categories (post_id, category_id) VALUES
  ('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440002'),
  ('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440003'),
  ('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440004')
ON CONFLICT (post_id, category_id) DO NOTHING;