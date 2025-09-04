---
title: How I Learned to Stop Engineering and Trust the Model
description: From 1000+ lines of over-engineered code to 60 lines of prompt. The story of discovering that everything I knew about software engineering was wrong for AI systems.
date: 2025-08-12
tags: 
  - technical-report
  - bitter-lesson
  - llm-systems
  - builder-wisdom
---

# How I Learned to Stop Engineering and Trust the Model

*From 1000+ lines of over-engineered code to 60 lines of prompt - and better results*

I built an elaborate system to convert text to structured data, process it through a map/reduce pipeline, then convert it back to text.

It took me weeks to realize how stupid that was.

Each layer of engineering I removed made the output better. This is the story of unlearning everything I knew about software engineering.

## The Problem

My team was distributed across timezones, communicating through Telegram channels, Google Docs, and video calls. Information was everywhere and nowhere. We needed something to synthesize all this communication into a daily digest - who's working on what, what decisions were made, what's blocked.

A coordination agent. Should be simple, right?

## Where I Started: Building a Database to Generate a Report

Like any good engineer, I started by defining my data structures. Obviously, I needed proper schemas:

```python
class Profile(BaseModel):
    name: str
    role: str
    topics: list[str]
    mentioned_in: list[str]
    # ... 10 more fields
```

Beautiful, right? Type-safe, validated, structured.

Then came the map/reduce pipeline (because we couldn't fit everything in a single context window):

**Map Phase**: Process each document individually
- Extract structured profiles from meeting transcripts
- Parse Telegram messages into categorized updates
- Output nice, clean JSON with all my Pydantic models

**Reduce Phase**: Aggregate everything
- Merge duplicate profiles (John vs John Smith vs JS)
- Combine topic lists
- Aggregate project updates
- Check context window limits (defensive programming!)
- Finally: Convert everything to markdown for the report

I had 1000+ lines of code. Error handling for edge cases. Async processing with proper concurrency limits. It was engineering porn.

There was just one problem: I was taking text, converting it to structured data, processing that data, then... converting it back to text.

## The First Crack in My Confidence

The absurdity hit me during debugging:

```
Meeting notes (text) → Extract profiles (structured) → Merge profiles (structured) → Output report (text)
```

Wait. Why was I creating all this structure just to destroy it at the end?

First experiment: Skip the Pydantic models. Just ask the LLM to extract insights as markdown.

The code shrank by 70%. The output got *better*. Less forced categorization. More natural flow. The team's response: "This is actually helpful now."

But I was still running map/reduce - extracting insights from each document, then merging them. Still thinking like an engineer.

## Releasing More Control

If the model could find insights better than my templates, why was I telling it what to look for?

Next experiment: Stop dictating what to extract.

Instead of "Extract people, projects, decisions, action items," I tried: "You're helping a team stay coordinated. Find what matters."

The results shocked me. The model found patterns I never would have thought to look for. Behavioral patterns. Decision patterns. Things that mattered but weren't in any template.

I was still orchestrating the pipeline, but the model was already showing me: it understood the problem better than I did.

## The Final Let-Go

At this point I was questioning everything. If the model was better at finding patterns, better at structuring output, better at identifying what mattered... why was I orchestrating anything at all?

The final form of the system:

```bash
# The entire "pipeline"
cat prompt.md | claude -p "Execute the provided instructions"
```

The prompt, simplified: "You're a team coach. Here's your workspace folder. Help the team."

That's it. No schemas. No templates. Just an objective and tools.

## What Emerged When I Got Out of the Way

I expected maybe a notes.md file.

The model created SEVEN specialized files without being asked:

```
Agent Memory/
├── coaching-interventions.md    # Wait, it's creating intervention strategies?
├── critical-decisions-log.md    # It's tracking decision history?
├── decision-patterns.md         # It's analyzing HOW we make decisions?
├── execution-blockers.md        # It's identifying systematic problems?
├── project-states.md
├── team-dynamics.md             # It's doing psychological analysis?
└── team-strengths.md
```

But here's the kicker - it wasn't just organizing. It was discovering things we didn't know about ourselves:

- **Hidden patterns**: "Critical decisions stall every Tuesday at 2pm" (turns out a key stakeholder had a recurring conflict we never noticed)
- **Team psychology**: "External validation addiction - won't ship without expert blessing on architecture, but launches products on gut feel"
- **Power dynamics**: Mapped who ACTUALLY makes decisions vs the org chart
- **Predictions**: "Based on spend trajectory, you'll hit the pain threshold in 12 days. Start building the alternative now."

It wasn't taking notes. It was building a behavioral model of our team.

I asked for a coordinator. It became an organizational psychologist.

I couldn't have designed this because *I don't even know these concepts exist*. But the model has consumed thousands of management books, case studies, and organizational patterns. It understood our team better than we understood ourselves.

## The Bitter Lesson, Realized

Every step toward trusting the model improved results:

1. **Remove structured data models** → Better output
2. **Remove extraction templates** → Better insights
3. **Remove orchestration** → Team intelligence emerges

This isn't about "simple is better." It's about something more fundamental:

**You're probably not smarter than the model at the task you're asking it to do.**

When I defined Pydantic models, I was saying "I know better how to structure profiles."
When I wrote extraction templates, I was saying "I know better what matters."
When I orchestrated map/reduce, I was saying "I know better how to process information."

I was wrong every time.

My engineering instincts were all wrong for this new world. I was trained on deterministic systems where you need defensive programming, error handling, structured data. Where good engineering means anticipating edge cases and controlling flow.

But LLMs aren't databases that need schemas. They're not APIs that need contracts. They're reasoning engines that already know the patterns you're trying to teach them.

The model didn't just do the job better. It did a DIFFERENT job - a better one I didn't even know to ask for. It built a predictive model of team behavior when I just wanted notes.

This is Rich Sutton's Bitter Lesson playing out in real time: general methods leveraging computation ultimately win over human knowledge. I kept trying to encode my knowledge into the system - schemas, templates, error handlers. But the model's training on vast text already encoded better patterns than I could ever design.

"GPU go brrr" became my mantra. Stop being clever. Let compute and reasoning do the work.

Every few months, these models get dramatically better. The elaborate scaffolding I built in July was already technical debt by August. Every layer of engineering I removed didn't just simplify the system - it made the output *better*. The model, freed from my constraints, did things I didn't even know to ask for.

I spent weeks building a summarizer. With one prompt, the model became something far more sophisticated.

The bitter lesson: I was wrong about what the model needed from me. It didn't need my engineering. It needed my problem and the freedom to solve it.

## The Bigger Picture

Turns out, this isn't just my personal discovery. There's a fundamental divide in how people build AI systems.

The [Compound AI Systems](https://bair.berkeley.edu/blog/2024/02/18/compound-ai-systems/) approach and frameworks like [12-Factor Agents](https://github.com/humanlayer/12-factor-agents) treat models as components needing orchestration. Intelligence is in the SYSTEM.

The [Claude Code team](https://www.latent.space/p/claude-code) bets the opposite: "everything is the model." They're designing for models six months out that will subsume today's architectures. Intelligence is IN the model.

The fundamental question: **Who should be in charge - the engineer's architecture or the model's reasoning?**

I started firmly in the first camp. But I was trying to architect something I didn't understand. I'm not an executive coach. I don't know how teams actually function. How could I design the control flow for something I can't do myself?

The model has read every management book, every case study, every coaching framework. It understood the domain better than I ever could.

This revealed something deeper: **You can't architect what you don't understand. But the model can.**

Traditional programming is limited to what you can express in code. Natural language + model + tools is infinitely more expressive. I couldn't write Pydantic models for team dynamics I don't understand. But I could say "be a coach" to something that understood coaching better than me.

The paradigm shift: We've been trying to compress intelligence into code, when we should be unleashing intelligence with tools. From "How do I code this?" to "How do I describe this goal and let the model do the thing?"

Every line of code I wrote to control the model was a line that prevented it from doing something better than I could imagine. But it wasn't just about code - every instruction about HOW to do things was equally limiting. "Extract these specific fields" became "find what matters." "Follow this template" became "help the team."

The less I said about how, the better it delivered.

*The final system: 60 lines of prompt. The model does the rest. The team loves it. I should have started there.*
