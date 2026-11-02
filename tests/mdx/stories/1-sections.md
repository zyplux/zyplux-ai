# 1. [Compiling MDX documents into section elements](1-sections.test.ts)

## 1.1 grouping content under level-two headings

### 1.1.1 wraps each level-two heading and its body in a section element

### 1.1.2 centers a lone intro paragraph inside its section

### 1.1.3 exports the frontmatter fields alongside the content

### 1.1.4 leaves a document without the sections flag untouched

## 1.2 reading layout attributes from headings

### 1.2.1 reads an id and layout tokens from the heading suffix

### 1.2.2 rejects an unknown section attribute

### 1.2.3 supports centered and slim section attributes

### 1.2.4 rejects formatted section headings

## 1.3 preserving section body content

### 1.3.1 preserves lists and code after the introduction

### 1.3.2 rejects module exports inside a section

### 1.3.3 supports quotes and sections without introductions

### 1.3.4 preserves multiple introductory paragraphs

## 1.4 updating insight metadata

### 1.4.1 reloads metadata changes while preserving body-only updates
