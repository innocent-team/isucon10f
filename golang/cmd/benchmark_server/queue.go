package main

import (
	"sync"

	xsuportal "github.com/isucon/isucon10-final/webapp/golang"
)

type jobQueue struct {
	queue []*xsuportal.BenchmarkJob
	sync.RWMutex
}

var q jobQueue

func (q *jobQueue) enqueue(job xsuportal.BenchmarkJob) {
	q.Lock()
	defer q.Unlock()
	q.queue = append(q.queue, &job)
}

func (q *jobQueue) dequeue() *xsuportal.BenchmarkJob {
	q.RLock()
	job := q.queue[0]
	q.RUnlock()

	if job == nil {
		return nil
	}

	q.Lock()
	q.queue = q.queue[1:]
	q.Unlock()

	return job
}
