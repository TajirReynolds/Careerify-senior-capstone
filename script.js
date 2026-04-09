document.addEventListener('DOMContentLoaded', function () {
    const isEmployer = localStorage.getItem('role') === 'employer';

const addJobSection = document.getElementById('addJobSection');
const notEmployerMessage = document.getElementById('notEmployerMessage');

if (isEmployer) {
  addJobSection.classList.remove('hidden');
} else {
  notEmployerMessage.classList.remove('hidden');
}
  const searchBar = document.getElementById('searchBar');
  const jobList = document.getElementById('jobList');

  if (!searchBar || !jobList) return;

  // Render job objects into the DOM
  function renderJobs(jobs) {
    jobList.innerHTML = '';
    if (!jobs || jobs.length === 0) {
      jobList.innerHTML = '<p>No jobs posted yet.</p>';
      return;
    }
    jobs.forEach(job => {
      const div = document.createElement('div');
      div.className = 'job';
      div.innerHTML = `
        <h4>${escapeHtml(job.title)}</h4>
        <p><strong>Company:</strong> ${escapeHtml(job.company)}</p>
        <p><strong>Location:</strong> ${escapeHtml(job.location)}</p>
        <p><strong>Type:</strong> ${escapeHtml(job.employment_type || '')}</p>
        <p><strong>Experience:</strong> ${escapeHtml(job.experience_level || '')}</p>
        <p><strong>Salary:</strong> ${escapeHtml(job.salary || '')}</p>
        <p>${nl2br(escapeHtml(job.description || ''))}</p>
        ${job.application_link ? `<p><a href="${escapeAttr(job.application_link)}" target="_blank">Apply</a></p>` : ''}
      `;
      jobList.appendChild(div);
    });
  }

  function nl2br(s){ return s.replace(/\n/g,'<br>'); }
  function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function escapeAttr(s){ return String(s).replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

  // fetch jobs from server
  function loadJobs() {
    fetch('get_jobs.php', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : [])
      .then(data => {
        renderJobs(data);
        filterJobs(searchBar.value);
      })
      .catch(() => {
        jobList.innerHTML = '<p>Could not load jobs.</p>';
      });
  }

  function filterJobs(query) {
    const q = query.trim().toLowerCase();
    const jobs = Array.from(jobList.querySelectorAll('.job'));
    if (q === '') {
      jobs.forEach(j => (j.style.display = ''));
      return;
    }
    jobs.forEach(j => {
      const text = j.textContent.toLowerCase();
      j.style.display = text.includes(q) ? '' : 'none';
    });
  }

  // live filter
  searchBar.addEventListener('input', function (e) {
    filterJobs(e.target.value);
  });

  // Enter focuses first visible result
  searchBar.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const first = jobList.querySelector('.job:not([style*="display: none"])');
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  loadJobs();
});