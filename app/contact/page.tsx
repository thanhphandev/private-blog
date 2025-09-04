'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Send, MessageSquare, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      form.reset();
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl text-[#333] mb-6">
            Get in <span className="text-[#d47d44]">Touch</span>
          </h1>
          <p className="font-lato text-xl text-[#4b5563] leading-relaxed max-w-2xl mx-auto">
            Have a question, suggestion, or just want to say hello? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="font-poppins font-semibold text-2xl text-[#333] mb-6">
                Let's Connect
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#d47d44]/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-[#d47d44]" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-medium text-lg text-[#333] mb-1">Email</h3>
                    <p className="font-lato text-[#4b5563]">hello@devblog.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#d47d44]/10 p-3 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-[#d47d44]" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-medium text-lg text-[#333] mb-1">Response Time</h3>
                    <p className="font-lato text-[#4b5563]">Usually within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <h3 className="font-poppins font-semibold text-xl text-[#333] mb-4">
                Quick Questions?
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-lato font-medium text-[#333]">Can you write about specific topics?</p>
                  <p className="font-lato text-[#4b5563]">Absolutely! I'm always open to suggestions for new content.</p>
                </div>
                <div>
                  <p className="font-lato font-medium text-[#333]">Do you accept guest posts?</p>
                  <p className="font-lato text-[#4b5563]">Currently focusing on original content, but open to collaboration.</p>
                </div>
                <div>
                  <p className="font-lato font-medium text-[#333]">How can I stay updated?</p>
                  <p className="font-lato text-[#4b5563]">Follow the RSS feed or check back regularly for new posts.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-neutral-200 shadow-lg">
            <CardHeader>
              <CardTitle className="font-poppins font-semibold text-2xl text-[#333] flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-[#d47d44]" />
                Send a Message
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-poppins font-semibold text-xl text-[#333] mb-2">
                    Message Sent!
                  </h3>
                  <p className="font-lato text-[#4b5563] mb-6">
                    Thanks for reaching out. I'll get back to you soon.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="font-lato"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="font-lato font-medium">Name</Label>
                      <Input
                        id="name"
                        {...form.register('name')}
                        placeholder="Your name"
                        className="mt-1 border-neutral-200 focus:border-[#d47d44] focus:ring-[#d47d44]/20"
                      />
                      {form.formState.errors.name && (
                        <p className="text-red-600 text-sm mt-1">{form.formState.errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className="font-lato font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register('email')}
                        placeholder="your@email.com"
                        className="mt-1 border-neutral-200 focus:border-[#d47d44] focus:ring-[#d47d44]/20"
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-600 text-sm mt-1">{form.formState.errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="font-lato font-medium">Subject</Label>
                    <Input
                      id="subject"
                      {...form.register('subject')}
                      placeholder="What's this about?"
                      className="mt-1 border-neutral-200 focus:border-[#d47d44] focus:ring-[#d47d44]/20"
                    />
                    {form.formState.errors.subject && (
                      <p className="text-red-600 text-sm mt-1">{form.formState.errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message" className="font-lato font-medium">Message</Label>
                    <Textarea
                      id="message"
                      {...form.register('message')}
                      placeholder="Your message..."
                      className="mt-1 h-32 resize-none border-neutral-200 focus:border-[#d47d44] focus:ring-[#d47d44]/20"
                    />
                    {form.formState.errors.message && (
                      <p className="text-red-600 text-sm mt-1">{form.formState.errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#d47d44] hover:bg-[#d47d44]/90 text-white font-lato"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}